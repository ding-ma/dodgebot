# Continuous Collection

Parses the request of the Frontend so we can store the results of the predictions

Request domain
```
{
    "redTeam":{
        "roles":{
            "top": int,
            "jg": int,
            "mid": int,
            "sup": int
        },
        "bans":{
            "ban1": int,
            "ban2": int,
            "ban3": int,
            "ban4": int,
            "ban5": int
        }
    },
    "blueTeam":{
        "roles":{
            "top": int,
            "jg": int,
            "mid": int,
            "sup": int
        },
        "bans":{
            "ban1": int,
            "ban2": int,
            "ban3": int,
            "ban4": int,
            "ban5": int
        }
    },
    "dodged": int,
    "redTeamWin": int,
    "elo": "IRON"|"BRONZE"|"SILVER"|"GOLD"|"PLATINUM"|"DIAMOND"|"MASTER"|"GRAND-MASTER"|"CHALLENGER",
    "region": "BR1"|"EUN1"|"EUW1"|"JP1"|"KR"|"LA1"|"LA2"|"NA1"|"OC1"|"TR1"|"RU"
}
```