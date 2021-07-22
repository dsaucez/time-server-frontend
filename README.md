# Build image
```bash
docker build -t frontend .
```

# Run docker image
```bash
docker run -p 8080:8080 -d -e APISERVER="http://127.0.0.1:3000" frontend
```

# Run native
```bash
export APISERVER="http://127.0.0.1:3000"
npm run start
```