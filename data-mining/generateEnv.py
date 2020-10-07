tiers = [
    "MASTER GRANDMASTER CHALLENGER",
    "DIAMOND",
    "PLATINUM",
    "GOLD",
    "SILVER",
    "BRONZE",
    "IRON"
]

keys = open(".env.list", "r").read()

for api, tier in zip(keys.split("\n"), tiers):
    fileName = tier.split()
    f = open(".env.{}".format(fileName[0].lower()), "w")
    f.write("API_KEY={}\nELO={}".format(api,tier))
    f.close()
