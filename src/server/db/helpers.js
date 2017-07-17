var MongoClient = require('mongodb').MongoClient;

const getCollection = name => new Promise((resolve, reject) => {
  MongoClient.connect("mongodb://localhost:27017/podcastPWA", function(err, db) {
    if(err) {
      reject(err);
    }
    resolve(db.collection(name));
  });
})

const execQuery = (collection, query) => new Promise((resolve, reject) => {
  collection.find(query).toArray(function(err, items) {
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

module.exports = {
  getCollection,
  execQuery,
  insert
}