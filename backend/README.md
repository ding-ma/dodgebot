# Backend of Dodge-Bot

To run the backend locally run the following commands:
1. 
```
pipenv shell && pipenv install
```
2.
```
docker compose up
```

The backend is now running locally. Visit `localhost:5555` to view the application

# Todo
* Look at https://hub.docker.com/r/tensorflow/serving, our flask backend can call this to optimize the images.
* Currently, the image is over 2.5GB. We need to reduce it.