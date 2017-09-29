const https = require('https');
const fs = require('fs');
const express = require('express');

const buildDir = 'C:\\Users\\niair\\projects\\podcast-pwa\\public';
const urls = [
  '/',
  '/podcast',
  '/howItWorks',
];

const rootRouter = express.Router();

rootRouter.use('/', express.static(buildDir));

rootRouter.use('/podcast', (req, res) => {
  res.sendFile(`${buildDir}\\index.html`);
})

rootRouter.use('/howItWorks', (req, res) => {
  res.sendFile(`${buildDir}\\index.html`);
})

rootRouter.use('/api', )

const options = {
  key: fs.readFileSync('./podcastpwa.com.key'),
  cert: fs.readFileSync('./podcastpwa_com.crt')
};

https.createServer(options, rootRouter).listen(8000);
