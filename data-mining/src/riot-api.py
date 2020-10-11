import os
import requests
import json
from dotenv import load_dotenv
from google.cloud import storage
from datetime import datetime, timedelta, date
import time
import glob
import logging

load_dotenv("../env/.env.local")  # loads the env file for local development

region = os.environ.get('REGION').upper()
elo = os.environ.get('ELO')
host = os.environ.get('HOST')

yesterday = date.today() - timedelta(days=1)
epochMs = int(time.mktime(yesterday.timetuple())) * 1000

folderName = os.path.join(region, elo)
timeStamp = datetime.now().strftime("%Y%m%d")
baseURL = "https://{}/lol".format(host)
header = {
    "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,fr;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": os.environ.get('API_KEY')
}

def get_module_logger(mod_name):
    """
    To use this, do logger = get_module_logger(__name__)
    """
    logger = logging.getLogger(mod_name)
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        '%(asctime)s [%(name)-12s] %(levelname)-8s %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)
    return logger


def upload_folder_gcs(source_folder, bucket_name="dodge-bot-data"):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    for files in glob.glob(source_folder + "/**"):
        blob = bucket.blob(files.replace('\\', '/'))
        blob.upload_from_filename(files)

    get_module_logger(__name__).info('upload done for ' + source_folder)


def make_folder(p):
    if not os.path.exists(p):
        os.makedirs(p)


def get_account_list():
    basePath = os.path.join(folderName, "SUMMONER")
    make_folder(basePath)
    for tier in ["II", "III"]:
        get_module_logger(__name__).info('Getting account list tier: {}'.format(tier))
        for page in range(1, 75):
            url = '{}/league-exp/v4/entries/RANKED_SOLO_5x5/{}/{}?page={}'.format(baseURL, elo, tier, page)
            data = requests.get(url=url, headers=header).json()

            if len(data) == 0:
                break

            path = os.path.join(basePath, "{}-T{}-p{}.json".format(timeStamp, tier, page))
            f = open(path, "w")
            f.write(json.dumps(data, indent=2))
            f.close()
            time.sleep(125)
    get_module_logger(__name__).info('Done getting account list')
    upload_folder_gcs(basePath)


def get_summoner_id(sum_id):
    url = '{}/summoner/v4/summoners/{}'.format(baseURL, sum_id)
    data = requests.get(url=url, headers=header).json()
    try:
        return data['accountId']
    except KeyError:
        return None


def get_matches():
    summonerPath = os.path.join(folderName, "SUMMONER")
    matchPath = os.path.join(folderName, "MATCHES")
    make_folder(matchPath)
    for file in glob.glob(summonerPath + "/**"):
        get_module_logger(__name__).info('Processing {}'.format(file))
        for i, accounts in enumerate(json.load(open(file))):
            summerId = accounts['summonerId']
            accountId = get_summoner_id(summerId)
            if accountId is None:
                continue

            url = '{}/match/v4/matchlists/by-account/{}?queue=420&beginTime={}'.format(baseURL, accountId, epochMs)

            data = requests.get(url=url, headers=header)

            if data.status_code == 404:
                continue

            data = data.json()
            data['summonerName'] = accounts['summonerName']
            data['tier'] = accounts['tier']
            data['rank'] = accounts['rank']

            file = os.path.join(matchPath,
                                "T{}-{}-{}.json".format(accounts['rank'], timeStamp, accounts['summonerName']))
            f = open(file, "w")
            f.write(json.dumps(data, indent=2))
            f.close()
            if i % 99 == 0:
                time.sleep(125)

    upload_folder_gcs(matchPath)


if __name__ == "__main__":
    # Step 1
    get_account_list()
    time.sleep(125)

    # Step 2
    get_matches()
