const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const redirectHttps = require('express-redirect-https');

const {apiApp} = require('./api');

const cwd = process.cwd();
const buildDir = `${cwd}/build`;
const urls = [
  '/',
  '/podcast',
  '/howItWorks',
];
const app = express();

app.use(redirectHttps());

app.use(express.static(buildDir));

app.all('/podcast/*', (req, res) => {
  res.sendFile(`${buildDir}/index.html`);
})

app.all('/howItWorks', (req, res) => {
  res.sendFile(`${buildDir}/index.html`);
})

app.use('/api', apiApp)


const testing = process.argv[2];
if (testing && testing==='true') {
  http.createServer(app).listen(4000);
} else {
  const options = {
    key: fs.readFileSync(`${cwd}/podcastpwa.com.key`),
    cert: fs.readFileSync(`${cwd}/podcastpwa_com.crt`)
  };
  http.createServer(app).listen(80);
  https.createServer(options, app).listen(443);
}
 