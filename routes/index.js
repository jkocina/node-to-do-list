const express = require('express');
const router = express.Router();
const MongoUtil = require('../util/mongoUtil');
const url = 'mongodb://localhost:27017';
var Todos;

/* GET home page. */
router.get('/', function(req, res, next) {

  //connecting to the mongo server
  MongoUtil.connectToServer(url, "todoapp", (err) => {
    if (err) console.log("There was an error connecting to the database: " + err);
  });

  //Getting the db instance
  db = MongoUtil.getDb();
  typeof("The type of the database is : " + db)

  //Getting the todos collection
  Todos = db.collection('todoapp');
  console.log("This is the type of the todos: " + typeof(Todos));

  //creating an array of todos and passing it to the index page
  Todos.find().toArray((err, todos) => {

    if(err) console.log(err);

    //Showing the todos
    console.log(JSON.stringify(todos));

    res.render('index', {
      title: "What to do",
      todos: todos
    });
  })

  //closing the db connection
  db.close;
});

function connectMongo(url, database, collection) {
  // Connect to MongoDB
  MongoClient.connect('mongodb://localhost:27017', (err,client) => {

    console.log('MongoDB connected...');

    //Getting the db
    let db = client.db(database);

    if (err) return console.log(err);

    console.log("The type of the collection is: " + typeof(db.collection(collection)));

    var coll = db.collection(collection);

    coll.find().toArray((err,items) => {
      if(err) throw err;
      console.log("THIS IS TODOS IN THE MONGO CONNECTION " +  JSON.stringify(items));
    });

    return coll;
  });
}
module.exports = router;
