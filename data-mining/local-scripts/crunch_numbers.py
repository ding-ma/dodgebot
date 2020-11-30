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
    data_points_per_region = dict.fromkeys(list(map(lambda x: x.split(".")[0].upper(), regions)), {})

    for region in data_points_per_region.keys():
        elo_dict = dict.fromkeys(elos, 0)

        for elo in elos:
            counter = 0
            for blob in client.list_blobs(bucket,
                                          prefix='{}/{}/'.format(region, elo)):
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
    """Layout is different"""
    data_points_per_region = []
    for blob in client.list_blobs("dodge-bot-remainder"):
        if ".csv" in blob.name:
            region, elo = blob.name[:-4].split("-")
            blob = blob.download_as_string()
            blob = blob.decode('utf-8')
            blob = StringIO(blob)
            names = csv.reader(blob)
            row_count = sum(1 for _ in names) - 1
            data_points_per_region.append((region,elo, row_count))

    return data_points_per_region


# print(get_in_remainder_bucket())
# processed = get_number_data_per_elo("dodge-bot-processed-data")
# raw = get_number_data_per_elo("dodge-bot")
# data_points_per_region = dict.fromkeys(list(map(lambda x: x.split(".")[0].upper(), regions)), dict.fromkeys(elos,0))
# # print(data_points_per_region)
regions = [('BR1', 'BRONZE', 33857), ('BR1', 'CHALLENGER', 0), ('BR1', 'DIAMOND', 20360), ('BR1', 'GOLD', 55844), ('BR1', 'GRANDMASTER', 5737), ('BR1', 'IRON', 31342), ('BR1', 'MASTER', 12340), ('BR1', 'PLATINUM', 36343), ('BR1', 'SILVER', 9757), ('EUN1', 'BRONZE', 13056), ('EUN1', 'CHALLENGER', 1397), ('EUN1', 'DIAMOND', 19685), ('EUN1', 'GOLD', 21660), ('EUN1', 'GRANDMASTER', 4282), ('EUN1', 'IRON', 33247), ('EUN1', 'MASTER', 5222), ('EUN1', 'PLATINUM', 19979), ('EUN1', 'SILVER', 37918), ('EUW1', 'BRONZE', 19287), ('EUW1', 'CHALLENGER', 2568), ('EUW1', 'DIAMOND', 22285), ('EUW1', 'GOLD', 16947), ('EUW1', 'GRANDMASTER', 7138), ('EUW1', 'IRON', 1538), ('EUW1', 'MASTER', 21460), ('EUW1', 'PLATINUM', 23919), ('EUW1', 'SILVER', 21497), ('JP1', 'BRONZE', 27626), ('JP1', 'CHALLENGER', 334), ('JP1', 'DIAMOND', 4974), ('JP1', 'GOLD', 5396), ('JP1', 'GRANDMASTER', 885), ('JP1', 'IRON', 2336), ('JP1', 'MASTER', 0), ('JP1', 'PLATINUM', 21662), ('JP1', 'SILVER', 14886), ('KR', 'BRONZE', 21533), ('KR', 'CHALLENGER', 3627), ('KR', 'DIAMOND', 7000), ('KR', 'GOLD', 41609), ('KR', 'GRANDMASTER', 9983), ('KR', 'IRON', 28498), ('KR', 'MASTER', 25712), ('KR', 'PLATINUM', 33015), ('KR', 'SILVER', 68573), ('LA1', 'BRONZE', 23768), ('LA1', 'CHALLENGER', 1485), ('LA1', 'DIAMOND', 1825), ('LA1', 'GOLD', 33638), ('LA1', 'GRANDMASTER', 3819), ('LA1', 'IRON', 19563), ('LA1', 'MASTER', 3971), ('LA1', 'PLATINUM', 25385), ('LA1', 'SILVER', 18890), ('LA2', 'BRONZE', 11460), ('LA2', 'CHALLENGER', 1565), ('LA2', 'DIAMOND', 34465), ('LA2', 'GOLD', 32571), ('LA2', 'GRANDMASTER', 3750), ('LA2', 'IRON', 16488), ('LA2', 'MASTER', 5281), ('LA2', 'PLATINUM', 4393), ('LA2', 'SILVER', 31474), ('NA1', 'BRONZE', 20869), ('NA1', 'CHALLENGER', 2262), ('NA1', 'DIAMOND', 21530), ('NA1', 'GOLD', 37953), ('NA1', 'GRANDMASTER', 6353), ('NA1', 'IRON', 31147), ('NA1', 'MASTER', 7450), ('NA1', 'PLATINUM', 14030), ('NA1', 'SILVER', 8216), ('OC1', 'BRONZE', 15312), ('OC1', 'CHALLENGER', 478), ('OC1', 'DIAMOND', 8813), ('OC1', 'GOLD', 34436), ('OC1', 'GRANDMASTER', 926), ('OC1', 'IRON', 5451), ('OC1', 'MASTER', 1354), ('OC1', 'PLATINUM', 4922), ('OC1', 'SILVER', 34238), ('RU', 'BRONZE', 26374), ('RU', 'CHALLENGER', 408), ('RU', 'DIAMOND', 7895), ('RU', 'GOLD', 32195), ('RU', 'GRANDMASTER', 917), ('RU', 'IRON', 6820), ('RU', 'MASTER', 180), ('RU', 'PLATINUM', 16355), ('RU', 'SILVER', 28436), ('TR1', 'BRONZE', 24846), ('TR1', 'CHALLENGER', 1370), ('TR1', 'DIAMOND', 18389), ('TR1', 'GOLD', 25166), ('TR1', 'GRANDMASTER', 4677), ('TR1', 'IRON', 20349), ('TR1', 'MASTER', 6206), ('TR1', 'PLATINUM', 8803), ('TR1', 'SILVER', 7210)]
# for r in regions:
#     # print(r)
#     reg = r[0]
#     elo = r[1]
#     data = r[2]
#     if not data_points_per_region[reg][elo]:
#         print(reg, elo)
#         data_points_per_region[reg][elo] = data
#
# print(data_points_per_region)
#
print(regions)