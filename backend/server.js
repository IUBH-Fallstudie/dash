const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');

const care = require('./service/care-service');
const mycampus = require('./service/mycampus-service');

const careUrl = 'https://care-fs.iubh.de/';

app.use(bodyParser.json());

app.use('/en', proxy('/en',
  {
    target: 'https://care-fs.iubh.de/',
    changeOrigin: true,
  }
));

app.post('/moodle/auth', (req, res) => {
  mycampus.authMoodle(req.body.user, req.body.pass).then(
    (authentication) => {
      if (authentication === false) {
        res.status(403).send(false);
      } else {
        res.send(authentication.clientInfo);
      }
    }
  )
});

app.post('/moodle/overview', (req, res) => {
  mycampus.getOverview(req.body.user, req.body.pass).then((overview) => {
    res.send(overview);
  });
});

app.get('/care/tor', (req, res) => {
  const cookie = req.headers.cookie;
  care.basicStats(cookie).then((data) => res.send(data));
});

app.use(express.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
