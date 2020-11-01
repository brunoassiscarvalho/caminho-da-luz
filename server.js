const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();

const port = process.env.PORT || 3005;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

if(process.env.NODE_ENV==="production")
app.get('*', function(req, res) {  
  res.redirect('https://' + req.headers.host + req.url);
})

require('./server/src/controllers/index')(app);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong '+ process.env.REACT_APP_MY_SERVICE);
});
app.get('', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
console.log("start server: "+ process.env.REACT_APP_MY_SERVICE)
app.listen(port);