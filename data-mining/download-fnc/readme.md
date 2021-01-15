### Download Function

This function aims to reduce the computation workload when a new file is uploaded.
It is a two part script.
1. When a file is uploaded to `dodge-bot-match-data`, it will be uploaded to the `to-download-NAME` bucket.
1. There is a part of the code that fetches on the `to-download-NAME` bucket for the individual user. 
   This way we can keep track of what the user downloaded without looking through the entire bucket. The script will delete the files on the bucket afterward.