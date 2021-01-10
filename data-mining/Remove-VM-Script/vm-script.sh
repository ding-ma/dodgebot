#!/usr/bin/bash

# Two possible options
# match --> match data
# raw --> raw data
config="raw"

#not a big deal if the key are exposed as they expire in 24h
rg_api1="RGAPI-6ee72441-db1b-4a31-8a6e-893c98aeb7c9"
rg_api2="RGAPI-b9aeb2f8-37a5-40cf-a3a2-636e3381aa97"

# if the VMs don't restart, the IP remains the same. (ephemeral ip address)
vm_ip2="34.72.129.54"
vm_ip1="34.70.58.59"

# This can be extended to N VM instances
ips=( "$vm_ip1" "$vm_ip2" )
apiKey=( "$rg_api1" "$rg_api2")

vmKey="./vm.key" # path to sk of vm
RED='\033[0;31m'
NC='\033[0m' # No Color

for i in "${!ips[@]}"; do
  echo -e "${RED}executing on ${ips[i]} ${NC}"
  ssh -i "${vmKey}" ma_ding_dm_gmail_com@"${ips[i]}" "bash -s ${apiKey[i]} $config" < match-data.sh
done
