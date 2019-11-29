const express = require('express');
const router = express.Router();
const sync = require('sync');
const MongoUtil = require('../util/mongoUtil');
var Todos;

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log("Right before we collected the collection");

  //connecting the db
  db = MongoUtil.getDb();

  //Getting the todos collection
  Todos = db.collection('todoapp');

  console.log("This is the type of the todos: " + typeof(Todos));

  //creating an array of todos and passing it to the index page
  Todos.find().toArray((err, todos) => {

    if(err) console.log(err);

    //Showing the todos
    console.log(JSON.stringify(todos));

    res.render('index', {
      title: "Things to do",
      todos: todos
    });
  })
});

module.exports = router;
