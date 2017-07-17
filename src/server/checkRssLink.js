const { rssParser } = require('./rssParser');

const checkRssLink = async responseBody => {
  try {
    const parsed = await rssParser(responseBody.link);
    const podcast = Object.assign({link: responseBody.link}, parsed);

    return podcast;
  } catch (e) { 
    return {error: `loading rss feed failed ${e.message}`}
  }
}

module.exports = { checkRssLink };