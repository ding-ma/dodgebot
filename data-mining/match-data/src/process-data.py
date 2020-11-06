import csv
import logging
import os
import time
from datetime import datetime

import requests
from dotenv import load_dotenv
from google.cloud import storage

load_dotenv("..//env/.env.na1")  # loads the env file for local development

region = os.environ.get('HOST').split(".")[0].upper()
host = os.environ.get('HOST')
key_expire_time = datetime.strptime(os.environ.get('KEY_EXPIRE'), "%Y-%m-%d-%H:%M")
elos = [
    'IRON',
    'BRONZE',
    'SILVER',
    'GOLD',
    'PLATINUM',
    'DIAMOND'
]

logger = logging.getLogger(region)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s [%(name)-3s] %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

base_url = "https://{}".format(host)
header = {
    "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,fr;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": os.environ.get('API_KEY')
}


def get_file_to_process(bucket_name='dodge-bot'):
    """Since all files have 70k entries, we will simply process 1 file from there everyday and download it"""
    client = storage.Client()
    for elo in elos:
        # todo change path when matches are cleaned
        for blob in client.list_blobs(bucket_name, prefix='{}/{}/MATCHES'.format(region, elo)):
            file_name = blob.name.split("/")[-1]
            if blob.metadata is not None:
                if blob.metadata['processed'] == 'No':
                    blob.download_to_filename(file_name)
                    return blob, file_name
    return None, None


def update_metadata(blob):
    """Update Metadata of that blob to say it was processed"""
    blob.metadata = {'processed': 'Yes'}
    blob.patch()


def read_and_process_csv(file):
    # redTeamWon 0 = RedTeamLost, 1 = RedTeamWon
    # teamId 100 = blueside, 200=redside

    file_in = open(file, "r", encoding="utf8")
    reader = csv.reader(file_in, delimiter=",")

    file_success = open("{}-{}".format("PROCESSED", file), "w")
    writer_success = csv.writer(file_success)
    writer_success.writerow([
        'GAME_ID', 'RedBan1', 'RedBan2', 'RedBan3', 'RedBan4', 'RedBan5',
        'RedTop', 'RedJg', 'RedMid', 'RedAdc', 'RedSup',
        'BlueBan1', 'BlueBan2', 'BlueBan3', 'BlueBan4', 'BlueBan5',
        'BlueTop', 'BlueJg', 'BlueMid', 'BlueAdc', 'BlueSup', 'redTeamWin'
    ])
    fails = 0
    success = 0

    logger.info("Starting to process file")
    for i, line in enumerate(reader, start=1):
        success, match_data = get_matches_by_id(line[0])
        print(i, line[0], success, match_data)
        if match_data:
            if success:
                writer_success.writerow(match_data)
                success += 1
            else:
                fails += 1
        if i % 99 == 0:
            time.sleep(125)
    return success / success + fails


def process_json(data):
    def filter_by_team(participants):
        red, blue = [], []
        for participant in participants:
            if participant['teamId'] == 100:
                blue.append(participant)
            else:
                red.append(participant)
        return blue, red

    def get_champion_ban_list(ban_map):
        lst = []
        for ban in ban_map:
            lst.append(ban['championId'])
        return lst

    def sort_per_role(team):
        """
        return convention:
        [0] = top
        [1] = jungle
        [2] = middle
        [3] = duo carry (adc)
        [4] = duo support

        adc and supports are calculated by the number of CS before 10 min
        Whoever is highest will get ADC role

        :param team: team list
        :return: sorted team list with the champion ID
        """

        extra_process = []
        champions_per_lane = [None] * 5
        champions_played = []
        # strips down the json to what we need
        for participant in team:
            lane = participant['timeline']['lane']
            role = participant['timeline']['role']
            champion = participant['championId']
            try:
                cs_at_10 = participant['timeline']['creepsPerMinDeltas']['0-10']
            except KeyError:
                cs_at_10 = 0
            if "TOP" in lane:
                champions_per_lane[0] = champion
            elif "JUNGLE" in lane:
                champions_per_lane[1] = champion
            elif "MIDDLE" in lane:
                champions_per_lane[2] = champion
            else:
                extra_process.append((lane, role, cs_at_10, champion))
            champions_played.append(champion)

        if len(extra_process) != 2:
            return False, champions_played

        bot_1 = extra_process[0]
        bot_2 = extra_process[1]
        if bot_1[2] > bot_2[2]:
            champions_per_lane[3] = bot_1[3]
            champions_per_lane[4] = bot_2[3]
        else:
            champions_per_lane[3] = bot_2[3]
            champions_per_lane[4] = bot_1[3]
        return True, champions_per_lane

    game_id = data['gameId']
    red_team_won = data['teams'][0]['win']

    if red_team_won == "Fail":
        red_team_won = 0
    else:
        red_team_won = 1

    blue_team_bans = get_champion_ban_list(data['teams'][0]['bans'])
    red_team_bans = get_champion_ban_list(data['teams'][1]['bans'])

    blue_participants, red_participants = filter_by_team(data['participants'])
    red_success, red_per_role = sort_per_role(red_participants)
    blue_success, blue_per_role = sort_per_role(blue_participants)

    if red_success and blue_success:
        return True, [game_id] + red_team_bans + red_per_role + blue_team_bans + blue_per_role + [red_team_won]
    else:
        return False, [game_id] + red_team_bans + red_per_role + blue_team_bans + blue_per_role + [red_team_won]


def get_matches_by_id(match_id):
    url = "{}/lol/match/v4/matches/{}".format(base_url, match_id)
    r = requests.get(url=url, headers=header)
    if r.status_code != 200:
        return False, []
    return process_json(r.json())


def upload_folder_gcs(success_rate, file_to_upload, path_to_upload, bucket_name="dodge-bot"):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(path_to_upload+file_to_upload)
    blob.metadata = {"success_rate": success_rate}
    blob.upload_from_filename(file_to_upload)


processBlob, file = get_file_to_process()
if processBlob:
    rate = read_and_process_csv(file)
    update_metadata(processBlob)
    upload_path = processBlob.name.split("/")
    upload_folder_gcs(
        rate, "PROCESSED-" + file,
        '{}/{}/{}/'.format(upload_path[0], upload_path[1], "MATCH-DETAILS")
    )

else:
    logger.info("All files for the current blob are processed!")
