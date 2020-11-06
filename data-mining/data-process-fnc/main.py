from google.cloud import storage
import pandas as pd

# from dotenv import load_dotenv
# load_dotenv(".env.na1")  # loads the env file for local development

MAX_SIZE = 70000


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
    uploaded_blob = upload_bucket.get_blob(event['name'])
    uploaded_file_name = uploaded_blob.name.split("/")[-1]
    uploaded_blob.download_to_filename(base_path + "DOWNLOAD-" + uploaded_file_name)
    uploaded_blob.metadata = {'processed': 'Yes', 'by': 'cloud_fnc'}
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

        blob_70k_upload_path = "{}/{}/{}/".format(region, tier, "MATCHES-DETAIL")
        blob_70k = upload_bucket.blob(blob_70k_upload_path + df_70k_filename)
        blob_70k.metadata = {'processed': 'No'}
        blob_70k.upload_from_filename(base_path + df_70k_filename)
        print("uploaded to", blob_70k_upload_path + df_70k_filename)

        blob_remainder = remainder_bucket.blob(remainder_file_name)
        blob_remainder.upload_from_filename(base_path + remainder_file_name)
        print("uploading file to both bucket", df_70k.shape, df_remainder_split.shape)
    else:
        combined_df.to_csv(base_path + remainder_file_name, index=False)

        combined_blob = remainder_bucket.blob(remainder_file_name)
        combined_blob.upload_from_filename(base_path + remainder_file_name)
        print("upload file to tmp bucket", combined_df.shape)


# mock_event = {
#     'bucket': 'dodge-bot-testing',
#     'name': 'KR/IRON/MATCHES/20201019-KR-IRON.csv'
# }
# resize_and_clean(mock_event, '')
