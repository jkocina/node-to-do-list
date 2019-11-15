const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todoapp';
var Todos;



/* GET home page. */
router.get('/', function(req, res, next) {

  Object Todos = connectMongo(url, "todoapp", "todoapp");

  console.log("This is the type of the todos: " + typeof(Todos));

  Todos.find().toArray((err, todos) => {

    if(err) {
      return console.log(err);
    }

    console.log(todos);

    res.render('index', {
      title: "What to do",
      todos: todos
    });
  })
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
