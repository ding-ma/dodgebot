import os
tiers = [
    "MASTER GRANDMASTER CHALLENGER",
    "DIAMOND",
    "PLATINUM",
    "GOLD",
    "SILVER",
    "BRONZE",
    "IRON"
]

keys = open("env/.env.list", "r").read()

for api, tier in zip(keys.split("\n"), tiers):
    fileName = tier.split()
    f = open(os.path.join("env",".env.{}".format(fileName[0].lower())), "w")
    f.write("API_KEY={}\nELO={}".format(api,tier))
    f.close()
