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
rg_api1="RGAPI-72e4d990-63c4-45fa-9f30-deac4c0c0669" # foobar01
rg_api2="RGAPI-89c0afab-7c1a-4cae-b6df-f9d16055f251" # foobar02
rg_api3="RGAPI-9eca7ff0-1e1f-4e92-9472-269d199888c0" # foobar03
rg_api4="RGAPI-f0609bf5-7365-4970-b961-2ab5b2203190" # foobar04
rg_api5="RGAPI-aa826973-1979-48d9-a6c8-7acfca45aa3e" # foobar05
rg_api6="RGAPI-65d520c8-1c09-4c86-8a73-91ca97c7edb2" # foobar06
rg_api7="RGAPI-dd668782-de12-4314-b0ef-a9f8b062763d" # foobar07
rg_api8="RGAPI-b9302336-c59d-4e85-a9f3-5e5b376a01f8" #


# if the VMs don't restart, the IP remains the same. (ephemeral ip address)
vm_ip1="35.226.1.78"
vm_ip2="34.71.188.165"
vm_ip3="34.71.137.178"
vm_ip4="104.197.158.172"
vm_ip5="34.72.199.173"
vm_ip6="34.121.140.29"
vm_ip7="35.238.37.207"
vm_ip8="35.232.59.174"


# This can be extended to N VM instances
# MAKE SURE they are the same length
ips=( "$vm_ip1" "$vm_ip2" "$vm_ip3" "$vm_ip4" "$vm_ip5" "$vm_ip6" "$vm_ip7" "$vm_ip8")
apiKey=( "$rg_api1" "$rg_api2" "$rg_api3" "$rg_api4" "$rg_api5" "$rg_api6" "$rg_api7" "$rg_api8")

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
