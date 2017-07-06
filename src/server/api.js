const apiApp = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { checkRssLink } = require('./checkRssLink');

apiApp.use(cors());

apiApp.post('/checkRssLink', bodyParser.json(), async function (req, res, next) {
  console.log(req.body);
  try {
    const parsedFeed = await checkRssLink(req.body);

    res.json(parsedFeed);
  } catch (e) { res.send(`parsing failed ${e.message}`) }
});

apiApp.get('/test', (req, res) => {
  console.log('test');
  res.send('vasya');
})

apiApp.listen(4000);
