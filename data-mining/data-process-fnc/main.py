from google.cloud import storage
import pandas as pd

# from dotenv import load_dotenv
# load_dotenv(".env.na1")  # loads the env file for local development


def set_blob_metadata(blob_name, bucket_name="dodge-bot"):
    """Set a blob's metadata."""
    # bucket_name = 'your-bucket-name'
    # blob_name = 'your-object-name'

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.get_blob(blob_name)
    metadata = {'processed': 'No'}
    blob.metadata = metadata

    print("The metadata for the blob {} is {}".format(blob.name, blob.metadata))
    blob.patch()


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

    client = storage.Client()
    upload_bucket = client.get_bucket(event['bucket'])
    uploaded_blob = upload_bucket.get_blob(event['name'])
    uploaded_file_name = uploaded_blob.name.split("/")[-1]
    uploaded_blob.download_to_filename(uploaded_file_name)
    paths = uploaded_blob.name.split("/")[:-1]
    region = paths[0]
    tier = paths[1]

    remainder_bucket = client.get_bucket("dodge-bot-remainder")
    remainder_file_name = '{}-{}.csv'.format(region, tier)
    remainder_blob = remainder_bucket.get_blob(remainder_file_name)
    remainder_blob.download_to_filename(remainder_file_name)

    uploaded_df = pd.read_csv(uploaded_file_name)
    print(uploaded_df.describe())

    remainder_df = pd.read_csv(remainder_file_name)
    print(remainder_df.describe())

