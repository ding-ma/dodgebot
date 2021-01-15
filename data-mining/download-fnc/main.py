from google.cloud import storage
import os

bucket_name = os.environ.get('NAME')


def download_file(event, context):
    """
    Background Cloud Function to be triggered by Cloud Storage.
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

    base_path = "/tmp/"

    upload_bucket = client.get_bucket(event['bucket'])
    uploaded_blob = upload_bucket.get_blob(event['name'])
    uploaded_file_name = uploaded_blob.name.split("/")[-1]
    uploaded_blob.download_to_filename(base_path + uploaded_file_name)
    
    to_download = client.bucket("to-download-"+bucket_name)
    blob = to_download.blob(uploaded_file_name)
    blob.upload_from_filename(base_path + uploaded_file_name)
    print('File: {} uploaded to {}'.format(event['name'], bucket_name))
