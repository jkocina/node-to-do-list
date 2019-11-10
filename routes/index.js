const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var Todos;



/* GET home page. */
router.get('/', function(req, res, next) {

  Todos = connectMongo(url, 'todos');

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

function connectMongo(server, database) {
  // Connect to MongoDB
  MongoClient.connect(server, (err,client) => {

    console.log('MongoDB connected...');

    if (err) throw err;

    var db = client.db('todoapp');

    collection = db.collection(database);
    console.log("THIS IS TODOS IN THE MONGO CONNECTION " + Todos.find());
    return collection;

  });
}
module.exports = router;
