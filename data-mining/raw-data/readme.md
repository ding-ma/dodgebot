## How it works
This scrapper uses one Riot Game API. Note, this scrapper does not support **Master+ elo**. 

* Scrapes all the data for all Regions for the selected elo and tier II, III. 
* Upload their profile on GCS (Google Cloud Storage).
* Upload their matches played for **yesterday** on GCS. This way, we can ensure that while training the ML model, 
we know very closely the rank of the player as Riot does not give a way to find it out. 

## Environment files
All .env files are located in the env folder. Change each accordingly

## generateEnv.py
* Rename the `sample.env.common` to `.env.common`
* Change the appropriate names in the `.env.common`
* Run the `generateEnv.py` script in order to generate all the environment variables for all the containers
* `KEY_EXPIRE=YYYY-MM-DD-HH:HH` is in 24H format and the time given is PST

## Possible Tiers
* CHALLENGER, GRANDMASTER, MASTER*
* DIAMOND
* PLATINUM 
* GOLD
* SILVER
* BRONZE
* IRON

\* since CHALLENGER, GRANDMASTER, AND MASTER tier represents less than 1% of the player base.
We will deal with them later. 

## Possible Regions
To change the region, edit the `docker-compose.yml`
|Platform|Host|
|--- |--- |
|BR1|br1.api.riotgames.com|
|EUN1|eun1.api.riotgames.com|
|EUW1|euw1.api.riotgames.com|
|JP1|jp1.api.riotgames.com|
|KR|kr.api.riotgames.com|
|LA1|la1.api.riotgames.com|
|LA2|la2.api.riotgames.com|
|NA1|na1.api.riotgames.com|
|OC1|oc1.api.riotgames.com|
|TR1|tr1.api.riotgames.com|
|RU|ru.api.riotgames.com|

## Deploy script
you can run the `deploy.py` script in order to 
1. clean docker containers
1. set api key
1. start docker containers with new variables

It will automatically set
* elo
* set api expiry time

### What to input
`deploy.py RIOT_API_KEY` takes arguments from the CLI.
* The time by default is tomorrow's 20:30 PST since the key expires after 24h. 
* The tier is based on the `.env.common` current tier + 2. For example, if it is DIAMOND, it will generate for BRONZE.
This script is used for a double container setup. 
