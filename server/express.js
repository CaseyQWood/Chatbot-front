const chatGenerate = require('./api/chatGeneration.js') 
const express = require('express')
const app = express()
const port = 3000

app.post('/', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  console.log("req: " + req.body)

  chatGenerate.then((data) => {
    res.send({data: data});
  });
  next();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

