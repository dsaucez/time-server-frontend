import axios from 'axios';
import express from 'express';
import redis from 'redis';

const APISERVER = process.env.APISERVER
const REDISCLUSTER = process.env.REDISCLUSTER
console.log("API server: " + APISERVER)
console.log("Redis cluster: " + REDISCLUSTER)

const PORT = 8080     // TODO should use ENV and fallback to 8080 instead
const app = express()

const cache = redis.createClient(REDISCLUSTER)

let count = 0;

app.get('/', (req, res) => {
  // get some statistics
  cache.get('count',
            (err, reply) => {
                              // get the value from cache
                              if (reply != null) { count = parseInt(reply) }
                              count = count + 1
                              // set the new value in cache
                              cache.set('count', count)
                            }
           );

  // API request info
  var config = {
    method: 'GET',
    url: APISERVER + '/time',
    headers: {}
  };

  axios(config)
    .then(function (response) {
      const great_text = "Current time is " + response.data.time + " on server " + response.data.id + " (total requests: "+ count + ")";
      res.send(great_text);
    })
    .catch(function (error) {
      res.status(500).send({error:error, count: count})
    });
})
app.listen(PORT, () => { console.log('listening on port ' + PORT) })
