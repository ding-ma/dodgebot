import sys
from datetime import datetime, timedelta
import os
import pytz

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
if len(sys.argv) != 2:
    raise KeyError("Script requires API_KEY argument")

file = open(os.path.join("env", ".env.common"), "r")
data = file.read().splitlines()
file.close()
tmr = datetime.now(pytz.utc) + timedelta(days=1) - timedelta(minutes=5)
apiExpireDate = tmr.astimezone(pytz.timezone("PST8PDT")).strftime("%Y-%m-%d-%H:%M")
data[0] = "API_KEY={}".format(sys.argv[1])
data[2] = "KEY_EXPIRE={}".format(apiExpireDate)


modifiedCommonEnv = open(os.path.join("env", ".env.common"), "w")
modifiedCommonEnv.writelines(line + '\n' for line in data)
modifiedCommonEnv.close()


common = open(os.path.join("env", ".env.common")).read()
for region in regions:
    fileName = region.split(".")
    f = open(os.path.join("env", ".env.{}".format(fileName[0].lower())), "w")
    f.write("HOST={}\n{}".format(region, common))
    f.close()

# following lines are to run on GCP container VMs
os.system('docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.24.0 down')
os.system('docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.24.0 pull')
os.system('docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.24.0 up -d')
