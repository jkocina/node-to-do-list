var express = require('express');
var router = express.Router();
const MongoUtil = require('../util/mongoUtil');

/**
 * This function will handle a POST request that will add a new task to the db
 */
router.post('/add', function(req, res, next) {

  //letting em know we submitted a form to add
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

/**
 * This function will handle a delete request that will delete a task from the db
 */
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

/**
 * This function will handle a get request to render the edit page
 */
router.get('/edit/:id', function(req, res, next) {

  //Letting em know we made it to the update form
  console.log("Update form requested");

  //Getting the db instance
  db = MongoUtil.getDb();

  //setting the query to update the db using json syntax
  let updateQuery = {_id: MongoUtil.getObjectId(req.params.id)};

  console.log(req.params.id);

  //Getting the todos collection
  Todos = db.collection('todoapp');

  //
  Todos.findOne({_id: MongoUtil.getObjectId(req.params.id)},(err, todo) => {


    console.log("The todo id value is " + todo._id);

    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(todo));
    res.render('edit', {
      title: "Todo Edit",
      todo: todo

    });
  });
});

/**
 * This function will handle an edit request from the edit page and edit a task
 * in the db
 */
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

  //updating the task in the db
  Todos.updateOne(query, {$set:update}, (err, result) => {
    if (err) {
      return console.log(err);
    }

    //Letting em know that the todo has been updated
    console.log('Todo updated...');

    //Redirecting to the main edit page
    res.redirect('/');
  });
});

module.exports = router;
