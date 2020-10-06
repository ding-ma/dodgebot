# Mine data from Riot API

1- get user list per rank [here](https://developer.riotgames.com/apis#league-exp-v4)

sample response:
```
[{
        "leagueId": "c60807e8-6afb-38fd-ab9b-ae8588dc8b27",
        "queueType": "RANKED_SOLO_5x5",
        "tier": "CHALLENGER",
        "rank": "I",
        "summonerId": "Wa1bxxXHTl_aawDkXcrPlvkr1rHgrxOnzraaGvbHwYoD6tA",
        "summonerName": "Revenge",
        "leaguePoints": 1488,
        "wins": 493,
        "losses": 411,
        "veteran": true,
        "inactive": false,
        "freshBlood": false,
        "hotStreak": true
    },
...
```
2- get the encrypted summer ID [here](https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerId)

sample response:
```
{
    "id": "jnoq3leFUIfkgtkIn010DNVzjaw0mAwWxujK6b7ggS8TuQ0",
    "accountId": "ur8d_cjECL74qgjdMoeNYLWHlrap1YWVq7t2PvkaNkGVIeQ",
    "puuid": "cZ2s9VmvAaVHRejWW7Sc2EPvdkIgB6QE666qbx5k3HRZNA2x1tP3VWbJi7msfr0EakpKcqu6DE2NIQ",
    "name": "Revenge",
    "profileIconId": 1425,
    "revisionDate": 1601879549000,
    "summonerLevel": 350
}
```
3- get all the matches from `acountId` here [here](https://developer.riotgames.com/apis#match-v4/GET_getMatchlist) with `queue = 420` for Solo Queue Ranked

sample response:
```
{
    "matches": [
        {
            "platformId": "NA1",
            "gameId": 3604074481,
            "champion": 114,
            "queue": 420,
            "season": 13,
            "timestamp": 1601865035826,
            "role": "NONE",
            "lane": "JUNGLE"
        },
        {
            "platformId": "NA1",
            "gameId": 3603829902,
            "champion": 92,
            "queue": 420,
            "season": 13,
            "timestamp": 1601853382293,
            "role": "SOLO",
            "lane": "TOP"
        },
...
```

4- Get the data for the game ID [here](https://developer.riotgames.com/apis#match-v4/GET_getMatch)
* TeamID: 100 for blue side
* TeamID: 200 for red side.

sample response
```
{
    "gameId": 3604074481,
    "platformId": "NA1",
    "gameCreation": 1601865035826,
    "gameDuration": 1850,
    "queueId": 420,
    "mapId": 11,
    "seasonId": 13,
    "gameVersion": "10.20.338.336",
    "gameMode": "CLASSIC",
    "gameType": "MATCHED_GAME",
    "teams": [
        {
            "teamId": 100,
            "win": "Win",
            "bans": [
                {
                    "championId": 104,
                    "pickTurn": 1
                },
                {
                    "championId": 28,
                    "pickTurn": 2
                },
                {
                    "championId": 236,
                    "pickTurn": 3
                },
                {
                    "championId": 245,
                    "pickTurn": 4
                },
                {
                    "championId": 2,
                    "pickTurn": 5
                }
            ]
        },
        {
            "teamId": 200,
            "win": "Fail",
            "bans": [...]
        }
    ],
    "participants": [
        {
            "participantId": 1,
            "teamId": 100,
            "championId": 20,
            "spell1Id": 4,
            "spell2Id": 11,
                [...]
                "role": "NONE",
                "lane": "JUNGLE"
            }
        },
        {
            "participantId": 2,
            "teamId": 100,
            "championId": 134,
            "spell1Id": 4,
            "spell2Id": 14,
                [...]
                "role": "SOLO",
                "lane": "MIDDLE"
            }
        },
    ...
    "participantIdentities": [
        {
            "participantId": 1,
            "player": {
                "platformId": "EUW1",
                "accountId": "atMiT7FGKgwUOydMVMnthsFS9jktiZ4uAMY2C56hNToIxQ",
                "summonerName": "7526",
                "summonerId": "ufr3spm30kBR7i47UDPzOYq8HlN5nGdRjZn8VsP7vu8e_Lw",
                "currentPlatformId": "NA1",
                "currentAccountId": "yKHiW3sHSDq9a0imiNbDiDzkXFKphGNgIYspyDa-73JGIcw",
                "matchHistoryUri": "/v1/stats/player_history/EUW1/29323073",
                "profileIcon": 4706
            }
        },
        {
            "participantId": 2,
            "player": {
                "platformId": "NA1",
                "accountId": "oxaOybePETd4Ay9mp6ggYbI-x6PXqMRjdM5n1tbP5iiA9mPaSyaMAGD_",
                "summonerName": "Tricker101",
                "summonerId": "GjdaZOEn7nE81L8JhDIfvG6_rdh_QVJY0acz7N6yg3NoPlTm",
                "currentPlatformId": "NA1",
                "currentAccountId": "oxaOybePETd4Ay9mp6ggYbI-x6PXqMRjdM5n1tbP5iiA9mPaSyaMAGD_",
                "matchHistoryUri": "/v1/stats/player_history/NA1/2358513086220576",
                "profileIcon": 775
            }
        },
    ]
}
      
```

# Useful link
* [champion id to name](http://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json)
* [spell ID](https://github.com/ngryman/lol-spells/blob/master/spells.json)
