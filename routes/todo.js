var express = require('express');
var router = express.Router();
const MongoUtil = require('../util/mongoUtil');
const url = 'mongodb://localhost:27017';

/* adds a task to the DB */
router.post('/add', function(req, res, next) {

  //letting em know we submitted a form
  console.log("Form submitted");

  //connecting the db
  db = MongoUtil.getDb();

  //setting the new task to pass to the db
  let newTask = {
    text:req.body.taskName,
    body:req.body.taskBody
  };

  //Getting the todos collection
  Todos = db.collection('todoapp');

  //submitting the new tasks to the database
  Todos.insertOne(newTask, (err, result) => {
    if(err) {
      return console.log("The error adding to the database is: " + err);
    }

    console.log("Todo added");
  });

  res.redirect('/');

});

//Deletes a task from the database
router.delete('/delete/:id', (req, res, next) => {

  //Creating the delete query
  const query = {"_id" : MongoUtil.getObjectId(req.params.id)};

  //Getting the db instance
  db = MongoUtil.getDb();

  ObjectId = MongoUtil.getObjectId();

  Todos = db.collection('todoapp');

  Todos.deleteOne(query, (err, response) => {

    if (err) {
      return console.log(err);
    }

    console.log('Todo Removed');
    res.sendStatus(200);
  });
});

/* redirects to the task editing screen */
router.get('/edit/:id', function(req, res, next) {

  console.log("Update form submitted");


  //Getting the db instance
  db = MongoUtil.getDb();

  let updateQuery = {_id: MongoUtil.getObjectId(req.params.id)};

  //Getting the todos collection
  Todos = db.collection('todoapp');
  Todos.find(updateQuery).next((err, todo) => {
    if (err) {
      return console.log(err);
    }
    res.render('edit', {
      title: "Todo Edit",
      todo: todo
    });
  });
});

/* edits a task */
router.post('/edit/:id', function(req, res, next) {

  console.log("Update form submitted");

  //Getting the db instance
  db = MongoUtil.getDb();

  let query = {_id: MongoUtil.getObjectId(req.params.id)};

  let update = {
    text: req.body.taskName,
    body: req.body.taskBody
  };

  //Getting the todos collection
  Todos = db.collection('todoapp');
  Todos.updateOne(query, {$set:update}, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log('Todo Added...');
    res.redirect('/');
  });
});

module.exports = router;
