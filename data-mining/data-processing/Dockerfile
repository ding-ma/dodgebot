FROM python:3.8

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY src/proces-data.py .

ENV TZ=PST8PDT

CMD ["python", "./proces-data.py"]
