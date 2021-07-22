const axios = require('axios');
const express = require('express');

const APISERVER = process.env["APISERVER"]                                                                                                                   
console.log(APISERVER)
const PORT = 8080
const app = express();

app.get('/', (req, res) => {
  var config = {
    method: 'GET',
    url: APISERVER + '/time',
    headers: {}
  };

  axios(config)
    .then(function (response) {
      const great_text = "Current time is " +response.data.time
      res.send(great_text)
    })
    .catch(function (error) {
      res.status(500).send({error:error})
    });
})
app.listen(PORT, () => { console.log('listening on port ' + PORT) })
