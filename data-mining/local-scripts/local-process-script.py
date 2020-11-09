from dotenv import load_dotenv
from google.cloud import storage
import pandas as pd
import csv

load_dotenv(".env.na1")  # loads the env file for local development
client = storage.Client()
bucket = client.get_bucket("dodge-bot-match-data")
MAX_SIZE = 70000

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
    for region in regions:
        for elo in elos:
            blob = bucket.blob('{}/{}/'.format(region.split(".")[0].upper(), elo))
            blob.upload_from_string('', content_type='application/x-www-form-urlencoded;charset=UTF-8')


def reset_meta_data():
    client = storage.Client()
    for elo in elos:
        for region in regions:
            for blob in client.list_blobs("dodge-bot-processed-data", prefix='{}/{}/'.format(region.split(".")[0].upper(), elo)):
                if ".csv" in blob.name:
                    blob.metadata = {"processed":"No"}
                    blob.patch()
                else:
                    blob.metadata = {}
                    blob.patch()

def generate_empty_csv():
    remainder_bucket = client.get_bucket("dodge-bot-remainder")

    for region in regions:
        for elo in elos:
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

    print('Bucket: {}'.format(event['bucket']))
    print('File: {}'.format(event['name']))
    base_path = "/tmp/"

    client = storage.Client()
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

    remainder_bucket = client.get_bucket("dodge-bot-remainder")
    remainder_file_name = '{}-{}.csv'.format(region, tier)
    remainder_blob = remainder_bucket.get_blob(remainder_file_name)
    remainder_blob.download_to_filename(base_path + "DOWNLOAD-" + remainder_file_name)

    uploaded_df = pd.read_csv(base_path + "DOWNLOAD-" + uploaded_file_name)
    remainder_df = pd.read_csv(base_path + "DOWNLOAD-" + remainder_file_name)

    #  more logic to preprocess can be added here
    combined_df = pd.concat([uploaded_df, remainder_df])
    combined_df.drop_duplicates(subset="GAME_ID", inplace=True)
    combined_df.drop(list(combined_df.filter(regex='Unnamed')), axis=1, inplace=True)

    if combined_df.shape[0] > MAX_SIZE:
        df_70k = combined_df[:MAX_SIZE]
        df_remainder_split = combined_df[MAX_SIZE:]
        df_70k_filename = "PROCESSED-" + uploaded_file_name

        df_70k.to_csv(base_path + df_70k_filename, encoding='utf-8', index=False)
        df_remainder_split.to_csv(base_path + remainder_file_name, encoding='utf-8', index=False)

        blob_70k_upload_path = "{}/{}/".format(region, tier)
        blob_70k = processed_bucket.blob(blob_70k_upload_path + df_70k_filename)
        blob_70k.metadata = {'processed': 'No'}
        blob_70k.upload_from_filename(base_path + df_70k_filename)
        print("uploaded to processed bucket", blob_70k_upload_path + df_70k_filename)

        blob_remainder = remainder_bucket.blob(remainder_file_name)
        blob_remainder.upload_from_filename(base_path + remainder_file_name)
        print("uploading file to both bucket", df_70k.shape, df_remainder_split.shape)
    else:
        combined_df.to_csv(base_path + remainder_file_name, index=False)

        combined_blob = remainder_bucket.blob(remainder_file_name)
        combined_blob.upload_from_filename(base_path + remainder_file_name)
        print("upload file to tmp bucket", combined_df.shape)


# for region in regions:
#     for elo in elos:
#         if elo in "IRON" and region in "br1":
#             continue
#         for blob in client.list_blobs("dodge-bot",
#                                       prefix='{}/{}/MATCHES/'.format(region.split(".")[0].upper(), elo)):
#             if ".csv" in blob.name:
#                 print(blob)
#                 e = {
#                     "bucket": blob.bucket.name,
#                     "name": blob.name
#                 }
#                 resize_and_clean(e, '')
