from dotenv import load_dotenv
from google.cloud import storage
import pandas as pd
import csv

load_dotenv(".env")  # loads the env file for local development
client = storage.Client()
MAX_SIZE = 35000

regions = [
    'br1.api.riotgames.com',
    'eun1.api.riotgames.com',
    'euw1.api.riotgames.com',
    'jp1.api.riotgames.com',
    'kr.api.riotgames.com',
    'la1.api.riotgames.com',
    'la2.api.riotgames.com',
    'na1.api.riotgames.com',
    'oc1.api.riotgames.com',
    'tr1.api.riotgames.com',
    'ru.api.riotgames.com'
]

elos = [
    'IRON',
    'BRONZE',
    'SILVER',
    'GOLD',
    'PLATINUM',
    'DIAMOND',
    'GRANDMASTER',
    'MASTER',
    'CHALLENGER'
]


def create_empty_folders():
    """creates empty folder on GCP for a given bucket"""
    bucket = client.get_bucket("dodge-bot-match-data")
    for region in regions:
        for elo in elos:
            blob = bucket.blob('{}/{}/'.format(region.split(".")[0].upper(), elo))
            blob.upload_from_string('', content_type='application/x-www-form-urlencoded;charset=UTF-8')


def download_all_files():
    for region in regions:
        for elo in elos:
            for blob in client.list_blobs("dodge-bot-match-data",
                                          prefix='{}/{}/'.format(region.split(".")[0].upper(), elo)):
                if ".csv" in blob.name:
                    print(region, elo, blob.name.split("/")[-1])
                    blob.download_to_filename("data/" + blob.name.split("/")[-1])

def reset_meta_data_prod():
    """removes all meta data of a bucket. this was used for testing the cloud funciton"""
    for elo in elos:
        for region in regions:
            for blob in client.list_blobs("dodge-bot-processed-data",
                                          prefix='{}/{}/'.format(region.split(".")[0].upper(), elo)):
                if ".csv" in blob.name:
                    if blob.metadata['processed'] == "InProgress":
                        # simply reset it to no and patch it
                        blob.metadata = {"processed": "No"}
                        blob.patch()
                else:
                    blob.metadata = {}
                    blob.patch()

# reset_meta_data_prod()

def generate_empty_csv():
    """create empty file with the same row  that we will have. used the remainder bucket"""
    remainder_bucket = client.get_bucket("dodge-bot-remainder")

    for region in regions:
        for elo in elos:
            # simply upload empty files for all region/elo combo
            f_name = "{}-{}.csv".format(region.split(".")[0].upper(), elo)
            csv_file = open(f_name, 'w', newline='')
            writer = csv.writer(csv_file)
            writer.writerow(['GAME_ID', 'ROLE', 'LANE', 'CHAMPION', 'TIME_STAMP', 'SUMMONER_NAME', 'TIER', 'RANK'])

            csv_file.close()
            blob = remainder_bucket.blob(f_name)
            blob.upload_from_filename(f_name)


def resize_and_clean(event, context):
    """Background Cloud Function to be triggered by Cloud Storage.
       This generic function logs relevant data when a file is changed.

    Args:
        event (dict):  The dictionary with data specific to this type of event.
                       The `data` field contains a description of the event in
                       the Cloud Storage `object` format described here:
                       https://cloud.google.com/storage/docs/json_api/v1/objects#resource
        context (google.cloud.functions.Context): Metadata of triggering event.
    Returns:
        None; the output is written to Stackdriver Logging
    """

    # this is the same code as cloud function, it is used to test locally
    print('Bucket: {}'.format(event['bucket']))
    print('File: {}'.format(event['name']))
    
    # only tmp is writable
    base_path = "/tmp/"

    # download the file that tirgered it
    upload_bucket = client.get_bucket(event['bucket'])
    processed_bucket = client.get_bucket("dodge-bot-processed-data")
    uploaded_blob = upload_bucket.get_blob(event['name'])
    uploaded_file_name = uploaded_blob.name.split("/")[-1]
    uploaded_blob.download_to_filename(base_path + "DOWNLOAD-" + uploaded_file_name)
    uploaded_blob.metadata = {'processed': 'Yes', 'by': 'local_script'}
    uploaded_blob.patch()

    paths = uploaded_blob.name.split("/")[:-1]
    region = paths[0]
    tier = paths[1]

    # donload corresponding remainder file
    remainder_bucket = client.get_bucket("dodge-bot-remainder")
    remainder_file_name = '{}-{}.csv'.format(region, tier)
    remainder_blob = remainder_bucket.get_blob(remainder_file_name)
    remainder_blob.download_to_filename(base_path + "DOWNLOAD-" + remainder_file_name)

    # read both files
    uploaded_df = pd.read_csv(base_path + "DOWNLOAD-" + uploaded_file_name)
    remainder_df = pd.read_csv(base_path + "DOWNLOAD-" + remainder_file_name)

    #  more logic to preprocess can be added here
    combined_df = pd.concat([uploaded_df, remainder_df])
    # only drop dpulicates by GAME_ID
    combined_df.drop_duplicates(subset="GAME_ID", inplace=True)
    combined_df.drop(list(combined_df.filter(regex='Unnamed')), axis=1, inplace=True)

    # check the size of the combined file
    if combined_df.shape[0] > MAX_SIZE:
        
        # split the combined file if it is larger than the constant
        df_70k = combined_df[:MAX_SIZE]
        df_remainder_split = combined_df[MAX_SIZE:]
        df_70k_filename = "PROCESSED-" + uploaded_file_name

        # write it as csv and upload it
        df_70k.to_csv(base_path + df_70k_filename, encoding='utf-8', index=False)
        df_remainder_split.to_csv(base_path + remainder_file_name, encoding='utf-8', index=False)

        # upload that file as a blob
        blob_70k_upload_path = "{}/{}/".format(region, tier)
        blob_70k = processed_bucket.blob(blob_70k_upload_path + df_70k_filename)
        blob_70k.metadata = {'processed': 'No'}
        blob_70k.upload_from_filename(base_path + df_70k_filename)
        print("uploaded to processed bucket", blob_70k_upload_path + df_70k_filename)

        # grab the remainder and upload it to the bucket
        blob_remainder = remainder_bucket.blob(remainder_file_name)
        blob_remainder.upload_from_filename(base_path + remainder_file_name)
        print("uploading file to both bucket", df_70k.shape, df_remainder_split.shape)
    else:
        # if it is smaller, we will simply upload to remainder bucket
        combined_df.to_csv(base_path + remainder_file_name, index=False)

        combined_blob = remainder_bucket.blob(remainder_file_name)
        combined_blob.upload_from_filename(base_path + remainder_file_name)
        print("upload file to tmp bucket", combined_df.shape)


def split_process_data_to_35k(blob_to_split):
    """
    split all files to 35k in length for the clean bucket. Since our files before was 70k in length
    """
    bucket = client.get_bucket("dodge-bot-match-data")

    # download all the fiels
    download_file_name = blob_to_split.name.split("/")[-1]
    upload_path = blob_to_split.name.split("/")[0] + "/" + blob_to_split.name.split("/")[1] + "/"
    blob_to_split.download_to_filename("tmp/" + download_file_name)
    df = pd.read_csv("tmp/" + download_file_name)
    # split them at 35k interval then upload them
    first_split = df[:MAX_SIZE]
    second_split = df[MAX_SIZE:]
    first_split.to_csv("tmp/" + "1-" + download_file_name, index=False)
    second_split.to_csv("tmp/" + "2-" + download_file_name, index=False)

    # tag the files with metadata so we can track them
    first_split_blob = bucket.blob(upload_path + "1-" + download_file_name)
    first_split_blob.metadata = {'processed': 'No'}

    second_split_blob = bucket.blob(upload_path + "2-" + download_file_name)
    second_split_blob.metadata = {'processed': 'No'}

    # upload file
    first_split_blob.upload_from_filename("tmp/1-" + download_file_name)
    second_split_blob.upload_from_filename("tmp/2-" + download_file_name)
    
    # delete the original file
    blob_to_split.delete()


# iterate on all region.elo for split the fiels
# for region in regions:
#     for elo in elos:
#         if elo in "IRON" and region in "br1":
#             continue
#         for blob in client.list_blobs("dodge-bot-processed-data",
#                                       prefix='{}/{}/'.format(region.split(".")[0].upper(), elo)):
#             if ".csv" in blob.name:
#                 print(blob)
#                 split_process_data_to_35k(blob)
