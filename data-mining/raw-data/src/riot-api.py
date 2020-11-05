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

# load_dotenv("..//env/.env.na1")  # loads the env file for local development

region = os.environ.get('HOST').split(".")[0].upper()
elo = os.environ.get('ELO')
host = os.environ.get('HOST')
key_expire_time = datetime.strptime(os.environ.get('KEY_EXPIRE'), "%Y-%m-%d-%H:%M")

tiers = ["II", "III"]
past_days = 2  # scrape past 3 days of data, including today's
if elo in ["MASTER", "GRANDMASTER", "CHALLENGER"]:
    tiers = ["I"]
    past_days = 20  # master+ we can get more data as that their is less volatile

days_to_scrape = date.today() - timedelta(days=past_days)
epoch_ms = int(time.mktime(days_to_scrape.timetuple())) * 1000

folder_name = os.path.join(region, elo)
time_stamp = datetime.now().strftime("%Y%m%d")

base_url = "https://{}/lol".format(host)
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


def upload_folder_gcs(source_folder, bucket_name="dodge-bot"):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    for files in glob.glob(source_folder + "/**"):
        blob = bucket.blob(files.replace('\\', '/'))
        blob.metadata = {'processed': 'No'}
        blob.upload_from_filename(files)
        blob.patch()

    logger.info('upload done for ' + source_folder)


def make_folder(p):
    if not os.path.exists(p):
        os.makedirs(p)


def get_account_list():
    base_path = os.path.join(folder_name, "SUMMONER")
    make_folder(base_path)
    api_counter = 0

    for tier in tiers:
        logger.info('Getting account list tier: {}'.format(tier))
        tier_files = os.path.join(base_path, tier)
        make_folder(tier_files)
        for page in range(1, 101):
            url = '{}/league-exp/v4/entries/RANKED_SOLO_5x5/{}/{}?page={}'.format(base_url, elo, tier, page)
            data = requests.get(url=url, headers=header)
            api_counter += 1
            if api_counter % 99 == 0:
                time.sleep(125)

            if data.status_code != 200:
                continue

            data = data.json()
            # means that we are at the end of the pages
            if len(data) == 0:
                break

            path = os.path.join(tier_files, "{}-T{}-p{}.json".format(time_stamp, tier, str(page).zfill(2)))
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
    url = '{}/summoner/v4/summoners/{}'.format(base_url, sum_id)
    try:
        data = requests.get(url=url, headers=header)
        return data.json()['accountId']
    except:
        return None


# todo: need to be more fault tolerant
def get_matches():
    base_path = os.path.join(folder_name, "SUMMONER")
    tier2_path = os.path.join(base_path, tiers[0])
    try:
        tier3_path = os.path.join(base_path, tiers[1])
    except IndexError:
        tier3_path = "randomPaths"

    # randomly shuffle the files in order to get as different summoners as possible on every pass of the scraper
    tier2_files = glob.glob(tier2_path + "/**")
    random.shuffle(tier2_files)

    tier3_files = glob.glob(tier3_path + "/**")
    random.shuffle(tier3_files)

    all_files = merge_sequentially(tier2_files, tier3_files, [])
    total_files = len(all_files)

    match_path = os.path.join(folder_name, "MATCHES")
    make_folder(match_path)
    csv_file = open(os.path.join(match_path, "{}-{}-{}.csv".format(time_stamp, region, elo)), 'a', newline='')
    writer = csv.writer(csv_file)
    writer.writerow(['GAME_ID', 'ROLE', 'LANE', 'CHAMPION', 'TIME_STAMP', 'SUMMONER_NAME', 'TIER', 'RANK'])

    api_counter = 0
    for i, file in enumerate(all_files, 1):
        logger.info('Processing {} -- {}/{}'.format(file, i, total_files))

        # if our key is expired
        if datetime.now() > key_expire_time:
            logger.warning('API Key expired!')
            break

        for accounts in json.load(open(file)):

            # if our key is expired
            if datetime.now() > key_expire_time:
                logger.warning('API Key expired!')
                break

            # happens when we exceed the limit
            if accounts == "status":
                break

            account_id = get_summoner_id(accounts['summonerId'])
            if account_id is None:
                continue

            url = '{}/match/v4/matchlists/by-account/{}?queue=420&beginTime={}'.format(base_url, account_id, epoch_ms)

            try:
                data = requests.get(url=url, headers=header)

                api_counter += 1
                if api_counter % 49 == 0:
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

            except:
                continue

    csv_file.close()
    upload_folder_gcs(match_path)


# Step 1
get_account_list()
time.sleep(125)

# Step 2
get_matches()
