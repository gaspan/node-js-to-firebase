var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
var controllers = require('./controllers')

app.use('/', controllers)

app.listen(3000, () => {
  console.log('started at port 3000');
});
