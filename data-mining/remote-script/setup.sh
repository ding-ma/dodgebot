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
rg_api1="RGAPI-7e1fa0ac-d724-4a72-941a-d2f063dee3fc" # baw
rg_api2="RGAPI-94c6007d-5c37-4db9-98c7-c3cce07a67f3" # learn
rg_api3="RGAPI-5783a768-1ca4-43b9-8266-162061337ba8" # mcgill
rg_api4="RGAPI-d94591ae-6afd-4cb5-adf7-3f1cf7942c4c" # qjoj
rg_api5="RGAPI-d7239401-1107-4ef8-911d-525acb0576d6" # haru
rg_api6="RGAPI-80eb98e6-26d9-4656-9cfc-66b6ea0718b9" # antho
rg_api7="RGAPI-da55a2d4-9e93-4b7e-bdf4-52f71a1e052a" # melissa
rg_api8="" # foobar01
rg_api9="" # foobar02
rg_api10="" # foobar03
rg_api11="" # foobar04
rg_api12="" # foobar05
rg_api13="" # foobar06
rg_api14="" # foobar07
rg_api15="" # barfoo01

# if the VMs don't restart, the IP remains the same. (ephemeral ip address)
vm_ip1="34.123.89.13"
vm_ip2="35.193.85.80"
vm_ip3="34.121.176.68"
vm_ip4="34.122.159.114"
vm_ip5="34.123.201.23"
vm_ip6="35.202.161.74"
vm_ip7="35.239.148.227"
vm_ip8=""
vm_ip9=""
vm_ip10=""
vm_ip11=""
vm_ip12=""
vm_ip13=""
vm_ip14=""
vm_ip15=""

# This can be extended to N VM instances
# MAKE SURE they are the same length
ips=( "$vm_ip1" "$vm_ip2" "$vm_ip3" "$vm_ip4" "$vm_ip5" "$vm_ip6" "$vm_ip7" )
apiKey=( "$rg_api1" "$rg_api2" "$rg_api3" "$rg_api4" "$rg_api5" "$rg_api6" "$rg_api7" )

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
