var MongoClient = require('mongodb').MongoClient;

let connection;
let connecting = false;

const getConnection = () => {
  if (connecting) {
    return Promise.reject();
  }
  connecting = true;
  return new Promise ((resolve, reject) => MongoClient.connect("mongodb://mongo:27017/podcastPWA", function(err, db) {
    connecting = false;
    if(err) {
      reject();
    }
    connection = db;
    resolve();
  }));
}

const getCollection = name => {
  if (connection) {
    return connection.collection(name);
  } else {
    return getConnection().then(() => getCollection(name), () => getCollection(name));
  }
}

const execQuery = (collection, query, projection) => new Promise((resolve, reject) => {
  collection.find(query, projection).toArray(function(err, items) {
    if (err) {
      reject(err);
    }
    resolve(items);
  });  
})

const aggregate = (collection, query) => new Promise((resolve, reject) => {
  collection.aggregate(query).toArray(function(err, items) {
    if (err) {
      reject(err);
    }
    resolve(items);
  });  
})

const insert = (collection, payload) => new Promise((resolve, reject)=> {
  collection.insert(payload, {w:1}, (err, result) => {
    if(err) {
      reject(err);
    }
    resolve();
  });
})

const updateOrInsert = (collection, query, payload) => new Promise ((resolve, reject) => {
  collection.update(query, payload, {upsert: true}, (err, result) => {
    if (err) {
      reject(err);
    }
    resolve();
  })
})

const update = (collection, query, payload, options) => new Promise ((resolve, reject) => {
  collection.update(query, payload, options, (err, result) => {
    if (err) {
      reject(err);
    }
    resolve();
  })
})

module.exports = {
  getCollection,
  execQuery,
  insert,
  aggregate,
  updateOrInsert,
  update
}