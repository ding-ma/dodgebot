#!/usr/bin/bash

# Two possible options
# match --> match data
# raw --> raw data
config="raw"
username="ma_ding_dm_gmail_com"
# not a big deal if the key are exposed as they expire in 24h
rg_api1=""
rg_api2=""

# if the VMs don't restart, the IP remains the same. (ephemeral ip address)
vm_ip1=""
vm_ip2=""

# This can be extended to N VM instances
# MAKE SURE they are the same length
ips=( "$vm_ip1" "$vm_ip2" )
apiKey=( "$rg_api1" "$rg_api2" )

RED='\033[0;31m'
NC='\033[0m' # No Color

if [ ${#ips[@]} != ${#apiKey[@]} ]; then
    echo "ips array length not equal to apiKey array length"
    exit 1
fi

for i in "${!ips[@]}"; do
  echo -e "${RED}executing on ${ips[i]} ${NC}"
  ssh -o StrictHostKeyChecking=no $username@"${ips[i]}" "bash -s ${apiKey[i]} $config" < match-data.sh
  echo -e "\n"
done
