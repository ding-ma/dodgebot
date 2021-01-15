#!/usr/bin/bash


# $1 is the API key which is not used.

base_path=""

if [ "$2" = "match" ]; then
  echo "Running for match data"
  base_path="/home/ma_ding_dm_gmail_com/dodgebot-master/data-mining/match-data"
elif [ "$2" = "raw" ]; then
  echo "Running for raw data"
  base_path="/home/ma_ding_dm_gmail_com/dodgebot-master/data-mining/raw-data"
else
  echo "wrong input, either 'raw' or 'match'"
  exit 1
fi

cd $base_path || exit


sudo docker-compose ps
