# Continuous Collection

Parses the request of the Frontend so we can store the results of the predictions

Request domain
```
{
   "friendlyTeam":{
      "top": "str_id",
      "jungle": "str_id",
      "mid":"str_id",
      "bot":"str_id",
      "support":"str_id"
   },
   "enemyTeam":{
      "top":""str_id"",
      "jungle":""str_id"",
      "mid":""str_id"",
      "bot":""str_id"",
      "support":""str_id""
   },
   "date": int(epoch in ms),
   "outcome":"dodge" | "win" | "loss",
   "elo": possible ranks,
   "predictedPercentage":[
       float
   ]
}
```