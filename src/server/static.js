const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const redirectHttps = require('express-redirect-https');
const expressStaticGzip = require("express-static-gzip");

const {apiApp} = require('./api');

const cwd = process.cwd();
const buildDir = `${cwd}/build`;
const urls = [
  '/',
  '/podcast',
  '/howItWorks',
];
const app = express();

const testing = process.argv[2] === 'true';
console.log(`tesing is equal to ${testing}`);

if (!testing) {
  app.use(redirectHttps());
}

app.use(expressStaticGzip(buildDir, {
  enableBrotli: true,
}));

app.all('/podcast/*', (req, res) => {
  res.sendFile(`${buildDir}/index.html`);
})

app.all('/howItWorks', (req, res) => {
  res.sendFile(`${buildDir}/index.html`);
})

app.use('/api', apiApp)

if (testing) {
  http.createServer(app).listen(4000);
} else {
  const options = {
    key: fs.readFileSync(`${cwd}/podcastpwa_com.key`),
    cert: fs.readFileSync(`${cwd}/podcastpwa_com.crt`)
  };
  http.createServer(app).listen(80);
  https.createServer(options, app).listen(443);
}
 