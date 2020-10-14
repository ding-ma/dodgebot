FROM python:3.8

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY src/riot-api.py .

CMD ["python", "./riot-api.py"]
