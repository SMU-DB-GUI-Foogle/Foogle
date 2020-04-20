const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

//mysql connection
var connection = mysql.createConnection({
  host: 'foogle-db',
  port: '3306',
  user: 'user',
  password: 'password',
  database: 'foogle'
});

//set up some configs for express.
const config = {
  name: 'foogle-app',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err) {
    logger.error("Cannot connect to DB!");
    logger.error(err.stack);
  }
  else
    logger.info("Connected to the DB!");
});


app.get('/', (req, res) => {
    res.status(200).send('Go to localhost:3000.');
    // connection.query('SELECT * FROM foods',(err, result, fields) => {
    //   if(err) logger.error(err.stack)
    //   res.end(JSON.stringify(result))
    // })
})

app.get('/:user/recipes', (req, res) => {
    var user = req.param('user')
    connection.query(`SELECT recipes.recipeId, foodName, numberOfServings FROM recipes JOIN users ON users.userId = recipes.userId JOIN ingredients ON ingredients.recipeId = recipes.recipeId JOIN foods ON ingredients.ingredientId = foods.foodId WHERE users.userId = ${user}`, (err, result, fields) => {
        if(err) logger.error(err.stack)
        res.end(JSON.stringify(result))
    })
})

// app.get('/profile/:username', (req,res) => {

// }




//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
    if (e) {
      throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
  });
