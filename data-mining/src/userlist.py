import os
from google.cloud import storage
from dotenv import load_dotenv
import requests

load_dotenv("../env/.env")


def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )


# todo, figure out how to upload file

# upload_blob("dodge-bot-data", "../requirements.txt", "gold/testupload2")
# Step 1

print(os.environ.get('ELO'), os.environ.get('API_KEY'), os.environ.get('HOST'))
