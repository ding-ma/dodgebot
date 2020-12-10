# Rebuild Match Detail
* Downloads file from GCP Bucket that has not been processed
* Set the metadata of that file to processing
* Process that file
* Upload result and set metadata to done


## How it works
After the data has been split, we will use a similar technique as the raw-data processor to gather the match data.