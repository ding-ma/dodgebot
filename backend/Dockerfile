FROM python:3.8
# todo: optimize to python:3.8-alpine
WORKDIR /backend
ADD . /backend

# todo: generate requirements.txt from CI pipeline
RUN pip install pipenv
RUN pipenv lock --requirements > requirements.txt


RUN pip install -r requirements.txt
CMD ["python","main.py"]