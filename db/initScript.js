var mongoClient = require('mongodb').MongoClient;

var db;
mongoClient.connect('mongodb://localhost:27017/blog', function (err, database) {
  console.log("Connected");
  if (err) return console.log(err);
  db = database;

  module.exports = db;
});
