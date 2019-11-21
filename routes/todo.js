var express = require('express');
var router = express.Router();
const MongoUtil = require('../util/mongoUtil');
const url = 'mongodb://localhost:27017';

/* GET users listing. */
router.post('/add', function(req, res, next) {
  console.log("Form submitted");

  //connecting to the mongo server
  MongoUtil.connectToServer(url, "todoapp", (err) => {
    if (err) console.log("There was an error connecting to the database: " + err);
  });

  //Getting the db instance
  db = MongoUtil.getDb();

  let newTask = {
    text:req.body.taskName,
    body:req.body.taskBody
  };

  //Getting the todos collection
  Todos = db.collection('todoapp');

  console.log("This is the type of the todos: " + typeof(Todos));

  //submitting the new tasks to the database
  Todos.insertOne(newTask, (err, result) => {
    if(err) {
      return console.log("The error adding to the database is: " + err);
    }

    console.log("Todo added");
  });

  res.redirect('/');

  //closing the db connection
  db.close;

});

//Deletes a task from the database
router.delete('/delete/:id', (req, res, next) => {

  //connect to the DB
  MongoUtil.connectToServer(url, "todoapp", (err) => {
    if (err) console.log("There was an error connecting to the database: " + err);
  });

  //Getting the db instance
  db = MongoUtil.getDb();
  ObjectId = MongoUtil.getObjectId();
  
  Todos = db.collection('todoapp');
  Todos.deleteOne({"_id" : ObjectId(req.params.id)}, (err, response) => {

    if (err) {
      return console.log(err);
    }
    console.log('Todo Removed');
    res.send(200);
  });

  res.redirect('/');

  //closing the db connection
  db.close;
});

module.exports = router;
