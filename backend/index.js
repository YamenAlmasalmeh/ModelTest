//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
const http = require('http');
const server = http.Server(app);


//Endpoint setup
require('./src/serve').setup(app);

//start listening on port
server.listen(80, '0.0.0.0');

module.exports = app;
