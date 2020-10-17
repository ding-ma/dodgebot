import sys
from datetime import datetime, timedelta
import os

# todo fix this
# from .generateEnv import generat

# defaults to 11:30pm EST if there is no extra arg
apiExpireDate = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d-20:30")
if len(sys.argv) == 4:
    apiExpireDate = sys.argv[3]

file = open(os.path.join("env", ".env.common"), "r")
data = file.read().splitlines()
file.close()
data[2] = "API_KEY={}".format(sys.argv[2])
data[3] = "ELO={}".format(sys.argv[1])
data[4] = "KEY_EXPIRE={}".format(apiExpireDate)

modifiedCommonEnv = open(os.path.join("env", ".env.common"), "w")
modifiedCommonEnv.writelines(line + '\n' for line in data)

os.system("docker-compose down")
os.system("python3 generateEnv.py")
os.system("docker-compose up")
