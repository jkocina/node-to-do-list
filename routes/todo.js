var express = require('express');
var router = express.Router();
const MongoUtil = require('../util/mongoUtil');
const url = 'mongodb://localhost:27017';

/* adds a task to the DB */
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

  //Creating the delete query
  const query = {"_id" : MongoUtil.getObjectId(req.params.id)};

  //connect to the DB
  MongoUtil.connectToServer(url, "todoapp", (err) => {
    if (err) console.log("There was an error connecting to the database: " + err);
    console.log("Connected to the server");
  });

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
  //closing the db connection
  db.close;
});

/* redirects to the task editing screen */
router.get('/edit/:id', function(req, res, next) {

  console.log("Update form submitted");

  //connecting to the mongo server
  MongoUtil.connectToServer(url, "todoapp", (err) => {
    if (err) console.log("There was an error connecting to the database: " + err);
  });

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

  //closing the db connection
  db.close;

});

/* edits a task */
router.post('/edit/:id', function(req, res, next) {

  console.log("Update form submitted");

  //connecting to the mongo server
  MongoUtil.connectToServer(url, "todoapp", (err) => {
    if (err) console.log("There was an error connecting to the database: " + err);
  });

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


  //closing the db connection
  db.close;

});

module.exports = router;
