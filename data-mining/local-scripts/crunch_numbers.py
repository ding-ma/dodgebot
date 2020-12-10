from dotenv import load_dotenv
from google.cloud import storage
from io import StringIO
import csv

# import pandas as pd


load_dotenv(".env.na1")
client = storage.Client()

regions = [
    'br1.api.riotgames.com',
    'eun1.api.riotgames.com',
    'euw1.api.riotgames.com',
    'jp1.api.riotgames.com',
    'kr.api.riotgames.com',
    'la1.api.riotgames.com',
    'la2.api.riotgames.com',
    'na1.api.riotgames.com',
    'oc1.api.riotgames.com',
    'tr1.api.riotgames.com',
    'ru.api.riotgames.com'
]

elos = [
    'IRON',
    'BRONZE',
    'SILVER',
    'GOLD',
    'PLATINUM',
    'DIAMOND',
    'GRANDMASTER',
    'MASTER',
    'CHALLENGER'
]


def get_number_data_per_elo(bucket):
    """get data from the raw bucket"""
    data_points_per_region = dict.fromkeys(list(map(lambda x: x.split(".")[0].upper(), regions)), {})

    # iterate through all the files based on region/elo
    for region in data_points_per_region.keys():
        elo_dict = dict.fromkeys(elos, 0)

        for elo in elos:
            counter = 0
            for blob in client.list_blobs(bucket,
                                          prefix='{}/{}/'.format(region, elo)):
                # download it temporarily and count how many lines it has
                if ".csv" in blob.name:
                    blob = blob.download_as_string()
                    blob = blob.decode('utf-8')
                    blob = StringIO(blob)
                    names = csv.reader(blob)
                    row_count = sum(1 for _ in names) - 1
                    counter += row_count

            elo_dict[elo] = counter
        data_points_per_region[region] = elo_dict

    return data_points_per_region


def get_in_remainder_bucket():
    """Layout is different but same concept"""
    data_points_per_region = []
    for blob in client.list_blobs("dodge-bot-remainder"):
        if ".csv" in blob.name:
            # download that file and count how many lines
            region, elo = blob.name[:-4].split("-")
            blob = blob.download_as_string()
            blob = blob.decode('utf-8')
            blob = StringIO(blob)
            names = csv.reader(blob)
            row_count = sum(1 for _ in names) - 1
            data_points_per_region.append((region,elo, row_count))

    return data_points_per_region


#  code used to gather details from the bucket
print(get_in_remainder_bucket())
processed = get_number_data_per_elo("dodge-bot-processed-data")
raw = get_number_data_per_elo("dodge-bot")
data_points_per_region = dict.fromkeys(list(map(lambda x: x.split(".")[0].upper(), regions)), dict.fromkeys(elos,0))
# print(data_points_per_region)
for r in regions:
    # print(r)
    reg = r[0]
    elo = r[1]
    data = r[2]
    if not data_points_per_region[reg][elo]:
        print(reg, elo)
        data_points_per_region[reg][elo] = data

print(data_points_per_region)

# print(regions)