const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');

const care = require('./service/care-service');
const mycampus = require('./service/mycampus-service');


app.use(bodyParser.json());

// Care Proxy
app.use('/en', proxy('/en',
  {
    target: 'https://care-fs.iubh.de/',
    changeOrigin: true,
    autoRewrite: true,
    cookieDomainRewrite: "https://care-fs.iubh.de",
    preserveHeaderKeyCase: true
  }
));

//Modulhandbücher
app.use('/kurs', proxy('/kurs',
  {
    target: 'https://iubh-fernstudium.de/',
    changeOrigin: true,
    followRedirects: true,
    autoRewrite: false,
    hostRewrite: false,
    secure: false,
  }
));
app.use('/modul', proxy('/modul',
  {
    target: 'https://iubh-fernstudium.de/',
    changeOrigin: true,
    followRedirects: true,
    autoRewrite: false,
    hostRewrite: false,
    secure: false,
  }
));

app.post('/moodle/auth', (req, res) => {
  mycampus.authMoodle(req.body.user, req.body.pass).then(
    (authentication) => {
      if (authentication === false) {
        res.status(403).send(false);
      } else {
        res.status(200).json(authentication);
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

app.use('/docs', express.static('doc'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 8090;
app.listen(port, () => console.log(`Server listening on port ${port}!`));


