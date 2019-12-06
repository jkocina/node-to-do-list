const os = require('os');

/**
 * setting the runtime environment and database url
 */
 module.exports = {

   setEnv: function() {

     //testing if the index local of the beginning of local is present in the hostname
     if (os.hostname().indexOf("local") > -1) {
       //Setting ENV Variables in the local ENV
       process.env.NODE_ENV = 'production';
       process.env.DB_URL = 'mongodb://localhost:27017';
       process.env.DB_NAME = 'todoapp';
     } else {

       //Setting ENV Variables in Heroku
       console.log("Heroku True");
       process.env.NODE_ENV = 'development';
       process.env.DB_URL = process.env.MONGODB_URI;
       process.env.DB_NAME = 'heroku_0xk8r3w4';
     }
   }
 };
