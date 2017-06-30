import parser from 'rss-parser';

const rssParser = xml => new Promise(resolve => {
  parser.parseString(xml, (err, parsed) => {
    resolve(parsed);
  })
});

export { rssParser }