# Build image
```bash
docker build -t frontend .
```

# Run docker image
```bash
docker run -p 8080:8080 -d -e APISERVER="http://127.0.0.1:3000" -e REDISCLUSTER="redis://127.0.0.1:6379" frontend
```

# Run native
```bash
export APISERVER="http://127.0.0.1:3000"
export REDISCLUSTER="redis://127.0.0.1:6379"
npm run start
```