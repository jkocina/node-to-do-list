const MongoClient = require("mongodb").MongoClient;

var _db;

module.exports = {

  connectToServer: function(url, database, callBack ) {
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
      _db = client.db(database);
      return callBack( err );
    });
  },

  getDb: function() {
    return _db;
  }
};
