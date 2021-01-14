#!/usr/bin/bash


if [ $# -ne 1 ]; then
    echo "Need input script ./vm-match.sh SCRIPT-TO-EXECUTE"
    exit 1
fi

# Two possible options
# match --> match data
# raw --> raw data
config="match"
username="ma_ding_dm_gmail_com"

# not a big deal if the key are exposed as they expire in 24h
rg_api1="RGAPI-e288727f-acdc-4120-a160-367cceba01be" # baw
rg_api2="RGAPI-8af0eb13-312a-4198-a3f1-6745a02b3827" # learn
rg_api3="RGAPI-876d7e92-0cae-44fa-9f55-8a5903824257" # mcgill
rg_api4="RGAPI-cbf023cb-2cc1-436a-a6b1-7f5b6f6bb271" # qjoj

# if the VMs don't restart, the IP remains the same. (ephemeral ip address)
vm_ip1="104.197.128.123"
vm_ip2="34.123.92.253"
vm_ip3="34.72.216.171"
vm_ip4="35.193.111.14"

# This can be extended to N VM instances
# MAKE SURE they are the same length
ips=( "$vm_ip1" "$vm_ip2" "$vm_ip3" "$vm_ip4" )
apiKey=( "$rg_api1" "$rg_api2" "$rg_api3" "$rg_api4" )

RED='\033[0;31m'
NC='\033[0m' # No Color

if [ ${#ips[@]} != ${#apiKey[@]} ]; then
    echo "ips array length not equal to apiKey array length"
    exit 1
fi

for i in "${!ips[@]}"; do
  echo -e "${RED}executing on ${ips[i]} ${NC}"
  ssh -o StrictHostKeyChecking=no $username@"${ips[i]}" "bash -s ${apiKey[i]} $config" < "$1"
  echo -e "\n"
done
