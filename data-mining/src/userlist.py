import os
from flask import Flask

server = Flask(__name__)

from google.cloud import storage


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

@server.route("/")
def hello():
    return os.environ.get('GOOGLE_APPLICATION_CREDENTIALS') + "\n" + open("/code/GCP_KEY.json", "r").read()


if __name__ == "__main__":
    server.run(host='0.0.0.0')
