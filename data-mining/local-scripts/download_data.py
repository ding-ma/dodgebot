"""
This script will go fetch the files that have been processed and remove them from the bucket after
"""

from dotenv import load_dotenv
from google.cloud import storage
import pandas as pd
import csv

load_dotenv(".env")  # loads the env file for local development
client = storage.Client()

# This will be used to keep track in the metadata of who downloaded the files
DOWNLOADER_NAME = "ding"
DOWNLOAD_PATH = "data/"
bucket = client.get_bucket("to-download-"+DOWNLOADER_NAME)

blobs = bucket.list_blobs()
for blob in blobs:
    blob.download_to_filename(DOWNLOAD_PATH + blob.name)
    print("downloaded {} to {}".format(blob.name, DOWNLOAD_PATH))
    blob.delete()

