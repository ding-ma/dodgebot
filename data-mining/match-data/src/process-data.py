"""
Process the match Id files and reconstructs the the matches
"""

import csv
import logging
import os
import time
from datetime import datetime
import random

import requests
from google.cloud import storage

from dotenv import load_dotenv

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

random.shuffle(elos)

# logger setup
logger = logging.getLogger(region)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s [%(name)-3s] %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

# request formation
base_url = "https://{}".format(host)
header = {
    "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,fr;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://developer.riotgames.com",
    "X-Riot-Token": os.environ.get('API_KEY')
}


def get_file_to_process(bucket_name='dodge-bot-processed-data'):
    """Since all files have 35k entries, we will simply process 1 file from there everyday and download it"""
    client = storage.Client()
    for elo in elos:
        blobs = list(client.list_blobs(bucket_name, prefix='{}/{}/'.format(region, elo)))
        random.shuffle(blobs)
        for blob in blobs:
            file_name = blob.name.split("/")[-1]
            if blob.metadata is not None and ".csv" in blob.name:
                # find one file that has not been processed and csv type
                if blob.metadata['processed'] == 'No':
                    blob.download_to_filename(file_name)
                    return blob, file_name
    return None, None


def update_metadata(blob, status):
    """Update Metadata of that blob to say it was processed"""
    blob.metadata = {'processed': status}
    blob.patch()
    logger.info("Metadata updated for {} to {}".format(blob.name, status))


def read_and_process_csv(f):
    """
    Reads and processes the csv file
    :param f: file name
    :return:
    """
    # redTeamWon 0 = RedTeamLost, 1 = RedTeamWon
    # teamId 100 = blueside, 200=redside
    
    file_in = open(f, "r", encoding="utf8")
    reader = csv.reader(file_in, delimiter=",")
    
    # creates result csv file
    file_success = open("{}-{}".format("MATCH", f), "w", newline='')
    writer_success = csv.writer(file_success)
    writer_success.writerow([
        'GAME_ID', 'RedBan1', 'RedBan2', 'RedBan3', 'RedBan4', 'RedBan5',
        'RedTop', 'RedJg', 'RedMid', 'RedAdc', 'RedSup',
        'BlueBan1', 'BlueBan2', 'BlueBan3', 'BlueBan4', 'BlueBan5',
        'BlueTop', 'BlueJg', 'BlueMid', 'BlueAdc', 'BlueSup', 'redTeamWin'
    ])
    
    # log how many matches were ideal matches
    fails = 1
    success = 1
    logger.info("Starting to process file " + f)
    
    # goes line by line from the 35k file and does the request to Riot Game API
    for i, line in enumerate(reader, start=1):
        match_data = get_matches_by_id(line[0])
        if match_data:
            writer_success.writerow([line[0]]+match_data)
            success += 1
        else:
            fails += 1
        #  Sleep needed not to go over rate limit
        if i % 99 == 0:
            time.sleep(125)
        if i % 1400 == 0:
            logger.info("Processed line of {}/{}".format(i, 35000))
    
    file_success.close()
    return success / fails


def process_data(data):
    """
    Process the result JSON from API call
    :param data: json fle
    :return: match detail (red and blue team pick/bans)
    """
    
    # discard data if it is a rematch
    # returns 1 if teamOne won, 0 is teamTwo won
    def get_winner(game_data):
        if game_data['teams'][0]['win'] == 'Win':
            return 1
        else:
            return 0
    
    # returns dict with key = role, value = (championId, cs)
    def get_players(player):
        players = {}
        
        # there are always 2 BOTTOM roles, we have to decide which one is adc (take higher cs at 10 mins)
        first_bot_champion_id = -1
        first_bot_minions = -1
        
        # get teamOne player roles and championId
        for player in player:
            role = player['timeline']['lane']
            # get minions killed and championId
            minions_killed = player['timeline']['creepsPerMinDeltas']['0-10']
            champion_id = player['championId']
            
            # place in dictionary
            if role != "BOTTOM":
                players[role] = (champion_id, minions_killed)
            elif first_bot_champion_id == -1:
                first_bot_champion_id = champion_id
                first_bot_minions = minions_killed
            # set higher cs to ADC, lower to SUPPORT
            elif minions_killed > first_bot_minions:
                players['ADC'] = (champion_id, minions_killed)
                players['SUPPORT'] = (first_bot_champion_id, first_bot_minions)
            else:
                players['SUPPORT'] = (champion_id, minions_killed)
                players['ADC'] = (first_bot_champion_id, first_bot_minions)
                
                # return dictionary
        return players
    
    # make array [t1TOP, t1JUNGLE, t1MIDDLE, t1ADC, t1SUPPORT,t2TOP, t2JUNGLE, t2MIDDLE, t2ADC, t2SUPPORT, winner]
    def create_game(team_one_players, team_one_ban, team_two_players, team_two_ban, win_team):
        game = []
        # append teamOne
        game.append(team_one_players['TOP'][0])
        game.append(team_one_players['JUNGLE'][0])
        game.append(team_one_players['MIDDLE'][0])
        game.append(team_one_players['ADC'][0])
        game.append(team_one_players['SUPPORT'][0])
        game += team_one_ban
        
        # append teamTwo
        game.append(team_two_players['TOP'][0])
        game.append(team_two_players['JUNGLE'][0])
        game.append(team_two_players['MIDDLE'][0])
        game.append(team_two_players['ADC'][0])
        game.append(team_two_players['SUPPORT'][0])
        game += team_two_ban
        
        # append winner
        game.append(win_team)
        
        return game
    
    def get_champion_ban_list(ban_map):
        """
        Get banned champion of the team
        :param ban_map: team id
        :return: banned champion list
        """
        lst = []
        for ban in ban_map:
            lst.append(ban['championId'])
        return lst
    
    if data['gameDuration'] < 900:
        return []
    
    winner = get_winner(data)
    participants = data['participants']
    team_data = data['teams']
    
    team_blue_players = get_players(participants[:5])
    team_blue_bans = get_champion_ban_list(team_data[0]['bans'])

    team_red_players = get_players(participants[5:])
    team_red_bans = get_champion_ban_list(team_data[1]['bans'])
    
    if len(team_blue_players.keys()) == 5 and len(team_red_players.keys()) == 5:
        game = create_game(team_blue_players, team_blue_bans, team_red_players, team_red_bans, winner)
        return game
    
    return []


def get_matches_by_id(match_id):
    """
    Request to get match detail based on match id
    :param match_id: match id
    :return: array of banned and pick champion per team
    """
    try:
        url = "{}/lol/match/v4/matches/{}".format(base_url, match_id)
        r = requests.get(url=url, headers=header)
        if r.status_code != 200:
            return []
        return process_data(r.json())
    # ConnectionError happens if the server is down.
    # There might be other exceptions so we will keep it broad for now
    except:
        return []


def upload_folder_gcs(success_rate, file_to_upload, path_to_upload, bucket_name="dodge-bot-match-data"):
    """
    Uploads the file to GCP
    :param success_rate: how many games were idea
    :param file_to_upload: file name to upload
    :param path_to_upload: its path
    :param bucket_name: defaults to dodge-bot-match-data bucket
    :return:
    """
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(path_to_upload + file_to_upload)
    blob.metadata = {"success_rate": success_rate}
    blob.upload_from_filename(file_to_upload)
    logger.info("File uploaded to dodge-bot-match-data/{}/{}".format(path_to_upload, file_to_upload))


# Driver Code
# Step one get a file to process
processBlob, file = get_file_to_process()

# If such file exist for that region, process it
if processBlob:
    update_metadata(processBlob, "InProgress")
    rate = read_and_process_csv(file)
    upload_path = processBlob.name.split("/")
    upload_folder_gcs(
        rate, "MATCH-" + file,
        '{}/{}/'.format(upload_path[0], upload_path[1])
    )
    update_metadata(processBlob, "Yes")
else:
    logger.info("All files for the current blob are processed!")
