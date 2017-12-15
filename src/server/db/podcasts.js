const { getCollection, execQuery, insert, update } = require('./helpers')
const uuidv4 = require('uuid/v4');

const savePodcast = async podcast => {
  const collection = await getCollection('podcast');
  const [ resultPodcast ] = await execQuery(collection, { rssLink: podcast.rssLink });
  
  if (resultPodcast) {
    console.log(`podcast with this feed is already preasent ${resultPodcast.id}`);
    return resultPodcast.id;
  }
  
  const id = uuidv4();
  await insert(collection, Object.assign({id}, podcast));
  console.log(`inserted podcast's id is ${id}`);
  return id;
}

const updatePodcast = async podcast => {
  const collection = await getCollection('podcast');
  await update(collection, {podcastID: podcast.podcastID}, {$set: podcast});
}

const getPodcast = async id => {
  const collection = await getCollection('podcast');
  const resultSet = await execQuery(collection, {id});

  return resultSet[0];
}

const getPodcastPreviews = async () => {
  const collection = await getCollection('podcast');
  const resultSet = await execQuery(collection,
      {},
      { entries: { $slice: -1 }}
  );

  return resultSet;
}

const getLastEpisode = async podcastID => {
  try {
    const collection = await getCollection('podcast');
    const resultSet = await execQuery(collection,
        { id: podcastID },
        { 
          entries: { $slice: 1 },
          title: 1
        }
    );

    return resultSet[0] && Object.assign(resultSet[0].entries[0], { podcastTitle: resultSet[0].title }, { podcastID })
  } catch(e) {
    return `retrival failed ${e}`;
  }
}

module.exports = {
  savePodcast,
  updatePodcast,
  getPodcast,
  getPodcastPreviews,
  getLastEpisode
}