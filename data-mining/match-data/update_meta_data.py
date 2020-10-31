from google.cloud import storage
from dotenv import load_dotenv

load_dotenv("..//env/.env.na1")  # loads the env file for local development


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
