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

baseURL = "https://{}".format(host)
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
    # redTeamWon 0 = RedTeamLost, 1 = RedTeamWon
    # teamId 100 = blueside, 200=redside
    writer.writerow([
        'GAME_ID', 'RedBan1', 'RedBan2', 'RedBan3', 'RedBan4', 'RedBan5',
        'RedTop', 'RedJg', 'RedMid', 'RedAdc', 'RedSup',
        'BlueBan1', 'BlueBan2', 'BlueBan3', 'BlueBan4', 'BlueBan5',
        'BlueTop', 'BlueJg', 'BlueMid', 'BlueAdc', 'BlueSup', 'redTeamWin'
    ])

    logger.info("Starting to process file")
    for i, line in enumerate(reader, start=1):
        match_data = get_matches_by_id(line[0])
        if match_data:
            writer.writerow(match_data)
        if i % 199 == 0:
            time.sleep(125)


def process_json(data):
    def filter_by_team(participants):
        red_participants, blue_participants = [], []
        for participant in participants:
            if participant['teamId'] == 100:
                blue_participants.append(participant)
            else:
                red_participants.append(participant)
        return blue_participants, red_participants

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

        """
        3 potential cases
        [DUO,DUO] -> need to do more filtering to get carry and support
        [DUO_CARRY, DUO_SUPPORT]->life is good
        [SOLO, NONE]?? -> discard that match
        """
        role_to_champion = {}

        bot_lane = [None] * 2
        rest_participants = []
        counter = 0
        need_extra_filtering = False
        for participant in team:
            lane = participant['timeline']['lane']
            role = participant['timeline']['role']
            if lane == 'BOTTOM':
                if lane == 'SOLO':
                    return []
                if role == "DUO_CARRY" or role == "DUO_SUPPORT":
                    role_to_champion[role] = participant['championId']
                if role == "DUO":
                    bot_lane[counter] = participant
                    counter += 1
                    need_extra_filtering = True
            else:
                rest_participants.append(participant)

        """we are going to take the cs at 10min as benchmark"""
        if need_extra_filtering:
            bot_1 = bot_lane[0]
            cs_bot_1 = bot_1['timeline']['creepsPerMinDeltas']['10-20']

            bot_2 = bot_lane[1]
            cs_bot_2 = bot_2['timeline']['creepsPerMinDeltas']['10-20']

            if cs_bot_1 > cs_bot_2:
                role_to_champion['DUO_CARRY'] = bot_1['championId']
                role_to_champion['DUO_SUPPORT'] = bot_2['championId']
            else:
                role_to_champion['DUO_CARRY'] = bot_2['championId']
                role_to_champion['DUO_SUPPORT'] = bot_1['championId']

        for participant in rest_participants:
            role = participant['timeline']['lane']
            role_to_champion[role] = participant['championId']

        champion_per_role = [None] * 5
        for k, v in role_to_champion.items():
            if k == 'DUO_CARRY':
                champion_per_role[3] = v
            if k == 'DUO_SUPPORT':
                champion_per_role[4] = v
            if k == 'MIDDLE':
                champion_per_role[2] = v
            if k == 'JUNGLE':
                champion_per_role[1] = v
            if k == 'TOP':
                champion_per_role[0] = v
        return champion_per_role

    game_id = data['gameId']
    red_team_won = data['teams'][0]['win']

    if red_team_won == "Fail":
        red_team_won = 0
    else:
        red_team_won = 1

    blue_team_bans = get_champion_ban_list(data['teams'][0]['bans'])
    red_team_bans = get_champion_ban_list(data['teams'][1]['bans'])

    blue_participants, red_participants = filter_by_team(data['participants'])
    red_per_role = sort_per_role(red_participants)
    blue_per_role = sort_per_role(blue_participants)

    print([game_id] + red_team_bans + red_per_role + blue_team_bans + blue_per_role + [red_team_won])
    print("----------------------")
    if red_per_role and blue_per_role:
        return [game_id] + red_team_bans + red_per_role + blue_team_bans + blue_per_role + [red_team_won]
    else:
        return []


def get_matches_by_id(match_id):
    url = "{}/lol/match/v4/matches/{}".format(baseURL, match_id)
    r = requests.get(url=url, headers=header)
    if r.status_code != 200:
        return []
    return process_json(r.json())


def upload_file_to_gcs():
    pass


processBlob = get_file_to_process()
if processBlob:
    read_and_process_csv()
    # update_metadata(processBlob)
else:
    logger.info("All files for the current blob are processed!")
