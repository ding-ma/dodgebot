#!/usr/bin/bash

# todo make more verbose?
rg_api=$1
base_path=""

if [ "$2" = "match" ]; then
  echo "Running for match data"
  base_path="/home/ma_ding_dm_gmail_com/dodgebot-master/data-mining/match-data"
elif [ "$2" = "raw" ]; then
  echo "Running for raw data"
  base_path="/home/ma_ding_dm_gmail_com/dodgebot-master/data-mining/raw-data"
else
  echo "Wrong input, either 'raw' or 'match'"
  exit 1
fi

cd $base_path || exit

echo "=================="
echo "Yesterday's Config"
cat env/.env.common
echo "=================="

status_output=$(sudo docker-compose ps)
#echo "$status_output"

if [[ "$status_output" == *"Up"* ]]; then
  echo "${RED}Some containers are still running, will not redeploy! ${NC}"
else
  python3 deploy.py "$rg_api"
  echo "=================="
  echo "Today's Config"
  cat env/.env.common
  echo "=================="
fi

