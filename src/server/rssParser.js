const parser = require('rss-parser');
const { pick, compose, map, prop, applySpec } = require('ramda');

// audio file and its type
const enclosureFields = ['url', 'type'];
const pickEnclosure = pick(enclosureFields);
// single episode properties
const processEntry = applySpec({
  pubDate: prop('pubDate'),
  title: prop('title'),
  link: prop('link'),
  enclosure: compose(
    pickEnclosure,
    prop('enclosure')
  ),
  guid: prop('guid'),
});
const processEntries = map(processEntry);
// high level properties of a podcast
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
//looking for a picture on a podcast

const rssParser = url => new Promise(resolve => {
  parser.parseURL(url, (err, parsed) => {
    const processedFeed = processFeed(parsed);

    resolve(processedFeed);
  })
});

module.exports =  { rssParser };