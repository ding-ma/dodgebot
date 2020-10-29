import csv
import glob
import json
import logging
import os
import random
import time
from datetime import datetime, timedelta, date
import requests
from google.cloud import storage
from dotenv import load_dotenv
import csv

load_dotenv("..//env/.env.na1")  # loads the env file for local development

region = os.environ.get('HOST').split(".")[0].upper()
elo = os.environ.get('ELO')
host = os.environ.get('HOST')
keyExpireTime = datetime.strptime(os.environ.get('KEY_EXPIRE'), "%Y-%m-%d-%H:%M")

logger = logging.getLogger(region)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s [%(name)-3s] %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

baseURL = "https://{}/lol".format(host)
header = {
    "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,fr;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": os.environ.get('API_KEY')
}


def get_file_to_process(bucket_name='dodge-bot', download_file_name="fileToProcess.csv"):
    """Since all files have 70k entries, we will simply process 1 file from there everyday and download it"""

    client = storage.Client()
    for blob in client.list_blobs(bucket_name, prefix='KR/CHALLENGER'):
        if blob.metadata is not None:
            if blob.metadata['processed'] == 'No':
                blob.download_to_filename(download_file_name)
                return blob
    return None


def update_metadata(blob):
    """Update Metadata of that blob to say it was processed"""
    blob.metadata = {'processed': 'Yes'}
    blob.patch()


def read_and_process_csv():
    file_in = open("fileToProcess.csv", "r", encoding="utf8")
    reader = csv.reader(file_in, delimiter=",")

    file_out = open("{}-{}-{}.csv".format('TIER', 'RANK', 'REGION'), "w")
    writer = csv.writer(file_out)
    writer.writerow([
        'GAME_ID', 'redTeamWon', 'RedBan1', 'RedBan2', 'RedBan3', 'RedBan4', 'RedBan5',
        'RedTop', 'RedJg', 'RedMid', 'RedAdc', 'RedSup'
        'BlueBan1', 'BlueBan2', 'BlueBan3', 'BlueBan4', 'BlueBan5',
        'BlueTop', 'BlueJg', 'BlueMid', 'BlueAdc', 'BlueSup'
    ])

    for i, line in enumerate(reader):
        # print('line[{}] = {}'.format(i, line))
        get_matches_by_id(line[0])
        if i % 199 == 0:
            time.sleep(125)


def get_matches_by_id(match_id):
    pass


def upload_file_to_gcs():
    pass


processBlob = get_file_to_process()
if processBlob:
    read_and_process_csv()
    # update_metadata(processBlob)
else:
    logger.info("All files for the current blob are processed!")
