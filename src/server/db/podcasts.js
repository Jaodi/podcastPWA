var { getCollection, execQuery, insert } = require('./helpers')
var uuidv4 = require('uuid/v4');

const savePodcast = async podcast => {
  const collection = await getCollection('podcast');
  const id = uuidv4();
  
  await insert(collection, Object.assign({id}, podcast));
  console.log(`inserted podcast's id is ${id}`);
  return id;
}

const getPodcast = async id => {
  const collection = await getCollection('podcast');
  const resultSet = await execQuery(collection, {id});

  return resultSet[0];
}

const getPodcastPreviews = async () => {
  
}

module.exports = {
  savePodcast,
  getPodcast
}