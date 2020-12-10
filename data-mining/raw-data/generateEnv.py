"""
Geneates .env file for each region based on the master .env file
"""
import os

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

common = open(os.path.join("env", ".env.common")).read()

for region in regions:
    fileName = region.split(".")
    f = open(os.path.join("env", ".env.{}".format(fileName[0].lower())), "w")
    f.write("HOST={}\n{}".format(region, common))
    f.close()
