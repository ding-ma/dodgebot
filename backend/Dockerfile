FROM python:3.8
# todo: optimize to python:3.8-alpine, this image is 2.67GB

WORKDIR /code

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# todo: generate requirements.txt from CI pipeline
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

EXPOSE 5000
COPY . .

CMD ["flask", "run"]