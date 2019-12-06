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

    //testing for an error and logging the results
    if(err) {
      return console.log("The error adding to the database is: " + err);
    }

    //letting em know that we added a todo
    console.log("Todo added");
  });

  //Redirecting to the root index
  res.redirect('/');

});

/**
 * This function will handle a delete request that will delete a task from the db
 */
router.delete('/delete/:id', (req, res, next) => {

  //creating the object id
  ObjectId = MongoUtil.getObjectId();

  //Creating the delete query
  const query = {"_id" : ObjectId(req.params.id)};

  //Getting the db instance
  db = MongoUtil.getDb();

  //setting the collection to the Todos variable
  Todos = db.collection('todoapp');

  //Deleting the todos and collecting the results
  Todos.deleteOne(query, (err, response) => {

    //testing for an error and logging it out
    if (err) {
      return console.log(err);
    }

    //Letting em know that we deleted the todo
    console.log('Todo Removed');

    //setting the status on the request to successful
    res.sendStatus(200);
  });
});

/**
 * This function will handle a get request to render the edit page
 */
router.get('/edit/:id', function(req, res, next) {

  //creating the object id
  ObjectId = MongoUtil.getObjectId();

  //Letting em know we made it to the update form
  console.log("Update form requested");

  //Getting the db instance
  db = MongoUtil.getDb();

  //setting the query to update the db using json syntax
  let updateQuery = {_id: ObjectId(req.params.id)};

  //Getting the todos collection
  Todos = db.collection('todoapp');

  //querying the db for one document to edit based on the document id
  Todos.findOne(updateQuery, (err, todo) => {

    //Testing and logging an error
    if (err) {
      return console.log(err);
    }

    //Redirecting to the edit page
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

  //letting em know that the update form was submitted
  console.log("Update form submitted");

  //Getting the db instance
  db = MongoUtil.getDb();

  //Setting the query of the document to edit
  let query = {_id: MongoUtil.getObjectId(req.params.id)};

  //Getting the values of the update from the request parameter
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
