![Deploy Web app to Firebase](https://github.com/ding-ma/dodgebot/workflows/Deploy%20Web%20app%20to%20Firebase/badge.svg?branch=master)

![Docker Image - Riot Scraper Raw Data](https://github.com/ding-ma/dodgebot/workflows/Docker%20Image%20-%20Riot%20Scraper%20Raw%20Data/badge.svg)

# Dodgebot

League of Legends ML algorithm to calculate the win percentage for a game.

## Folder Layout

- `.github/workflows`: CI/CD pipeline
- `backend`: ML Backend Code
- `continous-collection`: Cloud Function to collect data from frontend
- `data-analytics`: Notebooks used to analyze the data collected from the pipeline
- `data-mining`: Data Pipeline folder
- `frontend`: Folder for frontend implementation, with React Typescript
- `ml-script`: Notebook for training our ML model

## Dependencies:

- Docker v20+ with Docker-compose
- Python 3.8, all folder contains either `requirements.txt` or `pipfile`
- npm for frontend

We switched to virtualenv because pipenv takes too long to lock the dependencies
