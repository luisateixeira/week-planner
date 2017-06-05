const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port           = 8000;
const db             = require('./db');
const routes         = require('./routes');

/*
{
    recipes: {1: recipe, 2: recipe},
    weeks: [
        {
            number: x, // week number,
            year: xxxx
            planner: {
                dom: {recipe: id},
                ...
            }
        }
    ]
}
*/

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

routes(app, db);

app.listen(port, () => {
  console.log('We are live on ' + port);
});