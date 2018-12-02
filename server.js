'use strict';
/* const express = require('express')
const app = express()

var port = process.env.port || 3000;

require('dotenv').load({ silent: true });
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var path = require('path');


//---------------  set the server to listen
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());  

var publicDir = path.join(__dirname, 'public'); */

//var responses = require("./router.js");
//app.use('/', responses);

 /* app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`);
})  */



var fs = require('fs');
var resolve = require('path').resolve;
var app = require('express')();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;
var path = require('path');
var publicDir = path.join(__dirname, 'public');

app.set('port', port);
// Import API Routes
//app.use('/api', require('./api/index'));


// Build only in dev mode
//if (nuxtConfigFile.dev) {
// nuxt.build()
// .catch((error) => {
//   console.error(error) // eslint-disable-line no-console
//   process.exit(1)
// })
//}

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console