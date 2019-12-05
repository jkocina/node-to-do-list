const os = require('os');

/**
 * setting the runtime environment and database url
 */

 module.exports = {

   setEnv: function() {
     if (os.hostname().indexOf("local") > -1) {
       console.log("Localtrue");
       process.env.NODE_ENV = 'production';
       process.env.DB_URL = 'mongodb://localhost:27017';
       process.env.DB_NAME = 'todoapp';
     } else {
       console.log("Heroku True");
       process.env.NODE_ENV = 'development';
       process.env.DB_URL = 'process.env.MONGO_URI';
       process.env.DB_NAME = 'heroku_0xk8r3w4';
     }
   }
 };
