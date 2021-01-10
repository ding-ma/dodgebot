"""
Restarts the container with the new API key. Only works on GCP
"""

import sys
from datetime import datetime, timedelta
import os
import pytz
from subprocess import Popen

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

# reads from API key from CLI
if len(sys.argv) != 2:
    raise KeyError("Script requires API_KEY argument")

# adds 24h for expiry and uses .env.common to generate all the other keys
file = open(os.path.join("env", ".env.common"), "r")
data = file.read().splitlines()
file.close()

# calculates 24h-5min since every key lasts 24h
tmr = datetime.now(pytz.utc) + timedelta(days=1) - timedelta(minutes=5)
apiExpireDate = tmr.astimezone(pytz.timezone("PST8PDT")).strftime("%Y-%m-%d-%H:%M")
data[0] = "API_KEY={}".format(sys.argv[1])
data[2] = "KEY_EXPIRE={}".format(apiExpireDate)

# reads from common env file
modifiedCommonEnv = open(os.path.join("env", ".env.common"), "w")
modifiedCommonEnv.writelines(line + '\n' for line in data)
modifiedCommonEnv.close()

# produce all env files for the containers
common = open(os.path.join("env", ".env.common")).read()
for region in regions:
    fileName = region.split(".")
    f = open(os.path.join("env", ".env.{}".format(fileName[0].lower())), "w")
    f.write("HOST={}\n{}".format(region, common))
    f.close()

# following lines are to run on GCP container VMs
down = Popen(['sudo', 'docker-compose', 'down'])
down.wait()
pull = Popen(['sudo', 'docker-compose', 'pull'])
pull.wait()
up = Popen(['sudo', 'docker-compose', 'up', '-d'])
up.wait()
