const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var _db;

module.exports = {

  connectToServer: function(url, database, callBack ) {
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
      _db = client.db(database);
      console.log('db connected');
      
      return callBack( err );
    });
  },

  getDb: function() {
    return _db;
  },
  getObjectId: function() {
    return ObjectID;
  }
};
