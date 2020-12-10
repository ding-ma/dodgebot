"""
function that processes file input on the GCP
"""

from google.cloud import storage
import pandas as pd

MAX_SIZE = 35000


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
    # logs the trigger
    print('Bucket: {}'.format(event['bucket']))
    print('File: {}'.format(event['name']))
    
    # only /tmp/ folder is writable on GCP
    base_path = "/tmp/"

    # download the trigger file
    client = storage.Client()
    upload_bucket = client.get_bucket(event['bucket'])
    processed_bucket = client.get_bucket("dodge-bot-processed-data")
    uploaded_blob = upload_bucket.get_blob(event['name'])
    uploaded_file_name = uploaded_blob.name.split("/")[-1]
    uploaded_blob.download_to_filename(base_path + "DOWNLOAD-" + uploaded_file_name)

    # setup path/region based on that file
    paths = uploaded_blob.name.split("/")[:-1]
    region = paths[0]
    tier = paths[1]

    # download its corresponding remainder file
    remainder_bucket = client.get_bucket("dodge-bot-remainder")
    remainder_file_name = '{}-{}.csv'.format(region, tier)
    remainder_blob = remainder_bucket.get_blob(remainder_file_name)
    remainder_blob.download_to_filename(base_path + "DOWNLOAD-" + remainder_file_name)

    # read both csv into pd.df
    uploaded_df = pd.read_csv(base_path + "DOWNLOAD-" + uploaded_file_name)
    remainder_df = pd.read_csv(base_path + "DOWNLOAD-" + remainder_file_name)

    #  more logic to preprocess can be added here
    combined_df = pd.concat([uploaded_df, remainder_df])
    # for now, just drop the duplicates based on GAME_ID
    combined_df.drop_duplicates(subset="GAME_ID", inplace=True)
    combined_df.drop(list(combined_df.filter(regex='Unnamed')), axis=1, inplace=True)

    # if greater than 35k, split it into two files
    if combined_df.shape[0] > MAX_SIZE:
        df_35k = combined_df[:MAX_SIZE]
        df_remainder_split = combined_df[MAX_SIZE:]
        df_35k_filename = "PROCESSED-" + uploaded_file_name

        # get the 35k file
        df_35k.to_csv(base_path + df_35k_filename, encoding='utf-8', index=False)
        df_remainder_split.to_csv(base_path + remainder_file_name, encoding='utf-8', index=False)

        # upload the 35k to the clean bucket and add metadata to it
        blob_35k_upload_path = "{}/{}/".format(region, tier)
        blob_35k = processed_bucket.blob(blob_35k_upload_path + df_35k_filename)
        blob_35k.metadata = {'processed': 'No'}
        blob_35k.upload_from_filename(base_path + df_35k_filename)
        print("uploaded to processed bucket", blob_35k_upload_path + df_35k_filename)

        # upload remainder to remainder bucket
        blob_remainder = remainder_bucket.blob(remainder_file_name)
        blob_remainder.upload_from_filename(base_path + remainder_file_name)
        print("uploading file to both bucket", df_35k.shape, df_remainder_split.shape)
    else:
        
        # if file size is smaller, simply combine and upload to remainder bucket
        combined_df.to_csv(base_path + remainder_file_name, index=False)
        combined_blob = remainder_bucket.blob(remainder_file_name)
        combined_blob.upload_from_filename(base_path + remainder_file_name)
        print("upload file to tmp bucket", combined_df.shape)

    # update metadata up triggered function
    uploaded_blob.metadata = {'processed': 'Yes', 'by': 'cloud_fnc'}
    uploaded_blob.patch()
