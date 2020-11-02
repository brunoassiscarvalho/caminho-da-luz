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

const redirectionFilter = function (req, res, next) {
  const theDate = new Date();
  const receivedUrl = `${req.protocol}:\/\/${req.hostname}:${port}${req.url}`;

  if (req.get('X-Forwarded-Proto') === 'http') {
    const redirectTo = `https:\/\/${req.hostname}${req.url}`;
    console.log(`${theDate} Redirecting ${receivedUrl} --> ${redirectTo}`);
    res.redirect(301, redirectTo);
  } else {
    next();
  }
};

app.get('*', redirectionFilter);

require('./server/src/controllers/index')(app);

app.get('/ping', function (req, res) {
  return res.send('pong ' + process.env.REACT_APP_MY_SERVICE);
});


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});





// if (process.env.NODE_ENV === "production") {
//   app.get('*', function (req, res) {
//     if (req.headers['x-forwarded-proto'] != 'https')
//       res.redirect(process.env.REACT_APP_MY_SERVICE + req.url);
//     else res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// } else {

// }

console.log("start server: " + process.env.REACT_APP_MY_SERVICE)
app.listen(port);