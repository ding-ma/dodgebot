apiKeys = [
    "API_K1",
    "K2",
    "K3",
    "K4",
    "K5",
    "K6",
    "K7"
]


tiers = [
    "MASTER GRANDMASTER CHALLENGER",
    "DIAMOND",
    "PLATINUM",
    "GOLD",
    "SILVER",
    "BRONZE",
    "IRON"
]

for api, tier in zip(apiKeys, tiers):
    fileName = tier.split()
    f = open(".env.{}".format(fileName[0].lower()), "w")
    f.write("API_KEY={}\nELO={}".format(api,tier))
    f.close()
