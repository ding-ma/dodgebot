# Rebuild Match Detail
* Downloads file from GCP Bucket that has not been processed
* Set the metadata of that file to processing
* Process that file
* Upload result and set metadata to done

## How it works
After the data has been split, we will use a similar technique as the raw-data processor to gather the match data.

## ChampionID to Champion name 

Mapping can be found [here](http://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json)

Example from the JSON. We are interested in the "key" and "id". A lot of this information is not relevant for us.
The only way I can think of right now is rebuild this JSON into a dictionary where you have the `key` as `championID` and `value` as `championName`.
Otherwise, it would take O(N) for every query.

```
{
   "type":"champion",
   "format":"standAloneComplex",
   "version":"11.1.1",
   "data":{
      "Aatrox":{
         "version":"11.1.1",
         "id":"Aatrox",
         "key":"266",
         "name":"Aatrox",
         "title":"the Darkin Blade",
         "blurb":"Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...",
         "info":{
            "attack":8,
            "defense":4,
            "magic":3,
            "difficulty":4
         },
         "image":{
            "full":"Aatrox.png",
            "sprite":"champion0.png",
            "group":"champion",
            "x":0,
            "y":0,
            "w":48,
            "h":48
         },
         "tags":[
            "Fighter",
            "Tank"
         ],
         "partype":"Blood Well",
         "stats":{
            "hp":580,
            "hpperlevel":90,
            "mp":0,
            "mpperlevel":0,
            "movespeed":345,
            "armor":38,
            "armorperlevel":3.25,
            "spellblock":32,
            "spellblockperlevel":1.25,
            "attackrange":175,
            "hpregen":3,
            "hpregenperlevel":1,
            "mpregen":0,
            "mpregenperlevel":0,
            "crit":0,
            "critperlevel":0,
            "attackdamage":60,
            "attackdamageperlevel":5,
            "attackspeedperlevel":2.5,
            "attackspeed":0.651
         }
      },
      "Ahri":{
        ...
      },
      ...
}
```
More on this can be read [here](https://developer.riotgames.com/docs/lol#data-dragon_champions)

