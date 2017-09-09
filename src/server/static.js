const podcastApp = require('express')();

const urls = [
  '/',
  '/podcast',
  '/howItWorks',
];

apiApp.get('/static', async function (req, res, next) {
  console.log(req.body);
  try {
    const podcast = await checkRssLink(req.body);

    const podcastId = await savePodcast(podcast);
    res.json({id: podcastId});
  } catch (e) { res.send(`parsing failed ${e.message}`) }
});

apiApp.listen(3000);
