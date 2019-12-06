const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongoUtil = require('./util/mongoUtil');
const setEnv = require('./util/setEnv');

//Setting the location of routers used in the project
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const todoRouter = require('./routes/todo');

//With all the variable set we start the app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setting the host info to ENV vars
setEnv.setEnv();

//Log host information
console.log("You are currently trying to connect to the " + process.env.DB_URL + " env ");
console.log("You are currently trying to connect to the " + process.env.DB_NAME + " db ");
console.log("The host is " + process.env.HOST);

/**
 * Connecting to the database from the mongoUtil file. This will let the
 * application us getDb() to get a db connection
 */
MongoUtil.connectToServer(process.env.DB_URL, process.env.DB_NAME, (err) => {
  if (err) console.log("There was an error connecting to the database: " + err);
});

/**
 * Setting the application to use middleware:
 * Logger, json parser, cookie parser, and adding the public directory for view
 * access
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connecting the routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo', todoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
