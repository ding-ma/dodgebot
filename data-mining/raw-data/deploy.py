import sys
from datetime import datetime, timedelta
import os
import pytz

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

os.system('docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.24.0 down')
os.system("python3 generateEnv.py")
os.system('docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.24.0 pull')
os.system('docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.24.0 up -d')
