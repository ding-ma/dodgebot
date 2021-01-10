"""
Script used to restart the containers on GCP. It will not work locally.
"""

import sys
from datetime import datetime, timedelta
import os
import pytz
from subprocess import Popen


tiers = [
    'IRON',
    'BRONZE',
    'SILVER',
    'GOLD',
    'PLATINUM',
    'DIAMOND'
]

if len(sys.argv) != 2:
    raise KeyError("Script requires API_KEY argument")

file = open(os.path.join("env", ".env.common"), "r")
data = file.read().splitlines()
file.close()
tmr = datetime.now(pytz.utc) + timedelta(days=1) - timedelta(minutes=10)
apiExpireDate = tmr.astimezone(pytz.timezone("PST8PDT")).strftime("%Y-%m-%d-%H:%M")
tierIdx = tiers.index(data[3].split("=")[1])
nextTier = tiers[(tierIdx + 2) % len(tiers)]

data[2] = "API_KEY={}".format(sys.argv[1])
data[3] = "ELO={}".format(nextTier)
data[4] = "KEY_EXPIRE={}".format(apiExpireDate)

modifiedCommonEnv = open(os.path.join("env", ".env.common"), "w")
modifiedCommonEnv.writelines(line + '\n' for line in data)
modifiedCommonEnv.close()

down = Popen(['sudo', 'docker-compose', 'down'])
down.wait()
env = Popen(['python3', 'generateEnv.py'])
env.wait()
pull = Popen(['sudo', 'docker-compose', 'pull'])
pull.wait()
up = Popen(['sudo', 'docker-compose', 'up', '-d'])
up.wait()
