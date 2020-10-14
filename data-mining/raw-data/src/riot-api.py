import csv
import glob
import json
import logging
import os
import random
import time
from datetime import datetime, timedelta, date

import pytz
import requests
from dotenv import load_dotenv
from google.cloud import storage
from pytz import timezone

load_dotenv("../env/.env.local")  # loads the env file for local development

region = os.environ.get('HOST').split(".")[0].upper()
elo = os.environ.get('ELO')
host = os.environ.get('HOST')
keyExpireTime = datetime.strptime(os.environ.get('KEY_EXPIRE'), "%Y-%m-%d-%H:%M").replace(tzinfo=timezone('US/Pacific'))

daysToScrape = date.today() - timedelta(days=2)  # scrape past 3 days of data, including today's
epochMs = int(time.mktime(daysToScrape.timetuple())) * 1000

folderName = os.path.join(region, elo)
timeStamp = datetime.now().strftime("%Y%m%d")

baseURL = "https://{}/lol".format(host)
header = {
    "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,fr;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": os.environ.get('API_KEY')
}

logger = logging.getLogger(region)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s [%(name)-3s] %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)


def upload_folder_gcs(source_folder, bucket_name="dodge-bot-data"):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    for files in glob.glob(source_folder + "/**"):
        blob = bucket.blob(files.replace('\\', '/'))
        blob.upload_from_filename(files)

    logger.info('upload done for ' + source_folder)


def make_folder(p):
    if not os.path.exists(p):
        os.makedirs(p)


def get_account_list():
    basePath = os.path.join(folderName, "SUMMONER")
    make_folder(basePath)
    apiCounter = 0

    for tier in ["II", "III"]:
        logger.info('Getting account list tier: {}'.format(tier))
        tierFiles = os.path.join(basePath, tier)
        make_folder(tierFiles)
        for page in range(1, 101):
            url = '{}/league-exp/v4/entries/RANKED_SOLO_5x5/{}/{}?page={}'.format(baseURL, elo, tier, page)
            data = requests.get(url=url, headers=header)
            apiCounter += 1
            if apiCounter % 99 == 0:
                time.sleep(125)

            if data.status_code != 200:
                continue

            data = data.json()
            # means that we are at the end of the pages
            if len(data) == 0:
                break

            path = os.path.join(tierFiles, "{}-T{}-p{}.json".format(timeStamp, tier, str(page).zfill(2)))
            f = open(path, "w")
            f.write(json.dumps(data, indent=2))
            f.close()

    logger.info('Done getting account list')


def merge_sequentially(l1, l2, acc):
    if l1:
        x, xs = l1[0], l1[1:]
        return merge_sequentially(l2, xs, acc + [x])
    else:
        return acc + l2


def get_summoner_id(sum_id):
    url = '{}/summoner/v4/summoners/{}'.format(baseURL, sum_id)
    data = requests.get(url=url, headers=header)
    try:
        return data.json()['accountId']
    except:
        return None


# todo: need to be more fault tolerant
def get_matches():
    basePath = os.path.join(folderName, "SUMMONER")
    tier2Path = os.path.join(basePath, "II")
    tier3Path = os.path.join(basePath, "III")

    # randomly shuffle the files in order to get as different summoners as possible on every pass of the scraper
    tier2Files = glob.glob(tier2Path + "/**")
    random.shuffle(tier2Files)

    tier3Files = glob.glob(tier3Path + "/**")
    random.shuffle(tier3Files)

    allFiles = merge_sequentially(tier2Files, tier3Files, [])
    totalFiles = len(allFiles)

    matchPath = os.path.join(folderName, "MATCHES")
    make_folder(matchPath)
    csvFile = open(os.path.join(matchPath, "{}-{}-{}.csv".format(timeStamp, region, elo)), 'a', newline='')
    writer = csv.writer(csvFile)
    writer.writerow(['GAME_ID', 'ROLE', 'LANE', 'CHAMPION', 'TIME_STAMP', 'SUMMONER_NAME', 'TIER', 'RANK'])

    apiCounter = 0
    for i, file in enumerate(allFiles, 1):
        logger.info('Processing {} -- {}/{}'.format(file, i, totalFiles))

        # if our key is expired
        if datetime.now(tz=pytz.utc) > keyExpireTime:
            logger.warning('API Key expired!')
            break

        for accounts in json.load(open(file)):

            # if our key is expired
            if datetime.now(tz=pytz.utc) > keyExpireTime:
                logger.warning('API Key expired!')
                break

            # happens when we exceed the limit
            if accounts == "status":
                break

            accountId = get_summoner_id(accounts['summonerId'])
            if accountId is None:
                continue

            url = '{}/match/v4/matchlists/by-account/{}?queue=420&beginTime={}'.format(baseURL, accountId, epochMs)
            data = requests.get(url=url, headers=header)

            apiCounter += 1
            if apiCounter % 49 == 0:
                time.sleep(125)

            if data.status_code != 200:
                continue

            if data.status_code == 403:  # shouldn't get here
                logger.warning('API Key expired!')
                break

            for match in data.json()['matches']:
                try:
                    writer.writerow(
                        [match['gameId'], match['role'], match['lane'], match['champion'], match['timestamp'],
                         accounts['summonerName'], accounts['tier'], accounts['rank']]
                    )
                except:
                    continue

    csvFile.close()
    upload_folder_gcs(matchPath)


# Step 1
get_account_list()
time.sleep(125)

# Step 2
get_matches()
