FROM python:3.8-slim

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt
RUN pip install Flask gunicorn

CMD exec gunicorn --bind :$PORT --workers 3 --threads 3 --timeout 100 main:app  --access-logfile -