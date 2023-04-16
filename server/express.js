const chatGenerate = require('../pages/api/chatGeneration') 
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  console.log("REQ: " + req.body)

  const chatResponse = chatGenerate();
  res.send(chatResponse);
  next();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

