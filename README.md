# garbage_atsume_server

#### How to launch
```
docker build -t gatsume:1.0
docker run -it -p 8080:8080 --volume gatsume-data:/app/db --rm -d gatsume:1.0
```
