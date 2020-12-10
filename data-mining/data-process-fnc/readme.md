# How it works
When the raw data are uploaded, we will clean and split them in chunks for 35k per Region. 
This is the maximum number of requests we can make a day to Riot's Games API/

This function is triggered by a file upload. The docs can be found [here](https://cloud.google.com/functions/docs/calling/storage)

## Requirements
This is the only sub-folder that uses `requirements.txt`. This is due to the constraint set by Google Cloud Platform's functions. 

**Note**: This function is crucial as it adds metadata to the file it will upload. It is used to keep track of which file has been processed.