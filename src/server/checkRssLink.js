const { rssParser } = require('./rssParser');

const checkRssLink = async responseBody => {
  try {
    // const rssString = await request(responseBody.link)
    const parsed = await rssParser(responseBody.link);

    return parsed;
  } catch (e) { 
    return {error: `loading rss feed failed ${e.message}`}
  }
}

module.exports = { checkRssLink };