Containers are awesome so we are using them. Each container can scrape a different elo with a personal API key from riot. 
* rename the `sample.env.containerX` to `.env.tier` with `tier` being one of the possible tiers found below. 

## Possible Tiers
* CHALLENGER, GRANDMASTER, MASTER*
* DIAMOND
* PLATINUM 
* GOLD
* SILVER
* BRONZE
* IRON

\* since CHALLENGER, GRANDMASTER, AND MASTER tier represents less than 1% of the player base, we will group them together for this project

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
