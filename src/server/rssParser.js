const parser = require('rss-parser');
const { pick, compose, map, prop, assocPath, assoc, applySpec } = require('ramda');

const enclosureFields = ['url', 'type'];
const pickEnclosure = pick(enclosureFields);
const processEntry = applySpec({
  pubDate: prop('pubDate'),
  title: prop('title'),
  link: prop('link'),
  enclosure: compose(
    pickEnclosure,
    prop('enclosure')
  )
});
const processEntries = map(processEntry);
const processFeed = compose(
  applySpec({
    description: prop('description'), 
    link: prop('link'), 
    title: prop('title'),
    entries: compose(
      processEntries,
      prop('entries')
    )
  }),
  prop('feed')
);

const rssParser = url => new Promise(resolve => {
  parser.parseURL(url, (err, parsed) => {
    const processedFeed = processFeed(parsed);

    resolve(processedFeed);
  })
});

module.exports =  { rssParser };