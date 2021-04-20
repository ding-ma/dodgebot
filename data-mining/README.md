# Data Mining Pipeline

This pipeline is composed of three component:

1. Gather _MatchID_ and player's rank
1. Clean and resize _MatchID_
1. Reconstruct match detail based on the _MatchId_ and player's rank

## Dependencies management

At the exception to the cloud functions, the dependencies for the containers are managemed by _Pipenv_

To install:

```bash
pipenv shell && pipenv install
```

## Running the pipeline

This pipeline is designed to run on Google Cloud Platform. However, it is still possible to run locally.

## Creating the `.env` files

1. Riot Game account is needed. A free account can be registered [here](https://developer.riotgames.com/)
1. For each of the folder, there is its own `README.md`, it guides on how to generate the environment variables.
   There is a master `.env` file and it will generate the rest. The containers are set to run for 24h as the key only lasts for that long.

## Local runtime

**Note**: the cloud function is not supported locally.

1. Make sure you have Docker SDK
1. Make sure you have a valid `GCP_KEY.json`, this is a service account that allows you to upload files on the cloud.
1. After the `.env` files are created accordingly, simply run `docker-compose up`.
   This will last for 24h and the files will be automatically uploaded for GCP.
