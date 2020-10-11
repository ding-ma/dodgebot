FROM python:3.8

WORKDIR /code

COPY GCP_KEY.json .

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY src/riot-api.py .

CMD ["python", "-u", "./riot-api.py"]
