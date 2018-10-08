const proxy = require('http-proxy-middleware');
const express = require('express');
const app = express();
const path = require('path');

const middleware = require('./service/middleware-service');
const careUrl = 'https://care-fs.iubh.de/';

app.use('/en', proxy('/en',
  {
    target: 'https://care-fs.iubh.de/',
    changeOrigin: true,
  }
));

app.get('/tor', (req, res) => {
  const cookie = req.headers.cookie;
  middleware.basicStats(cookie).then((data) => res.send(data));
});

app.use(express.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
