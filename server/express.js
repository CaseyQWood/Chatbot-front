const {chatGenerate} = require('./api/chatGeneration.js') 
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
app.use(cors());
var bodyParser  = require('body-parser');
const { response } = require('express');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  console.log("req:Body", req.body);
  //console.log("RES: " + res)

  chatGenerate(req.body.prompt).then((data) => {
    return res.send({data: data});

  });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

