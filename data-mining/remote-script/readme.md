# Remote Access GCP VM

Note: this script has only been tested under Ubuntu 20.04 LTS (Native and WSL)

## To connect
1. Generate your ssh key (if they don't exist)
1. Use the following gcloud command to add your ssh **public** key to the VMs
```
gcloud compute os-login ssh-keys add \
    --key-file=KEY_FILE_PATH \
    --ttl=0
```
`--key-file=` refers to your public key
3. `ssh USERNAME@EXTERNAL_IP`. You might need to add `-i PATH_TO_PRIVATE_KEY`. Accept ssh fingerprint from VM when prompted

Now that you are authenticated, you can run the script across multiple VMs.

### Source
* https://cloud.google.com/compute/docs/instances/connecting-advanced#linux-and-macos
* https://cloud.google.com/compute/docs/instances/managing-instance-access#add_oslogin_keys