const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todoapp';

// Connect to MongoDB
MongoClient.connect(url, (err,db) => {

  console.log('MongoDB connected...');

  if (err) throw err;

  Todos = db.collection('todos');

});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  Todos.find({})
});

module.exports = router;
