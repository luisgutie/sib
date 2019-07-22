// app.js
const path = require('path');
const morgan = require('morgan');
var mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
//const dotenv = require("dotenv");

const index = require('./routes/index.route');
const user = require('./routes/user.route'); // Imports routes for the products
// initialize our express app
const app = express();

// Set up mongoose connection
var dev_db_url = 'mongodb://127.0.0.1:27017/sib';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(db => console.log('Db connected'))
.catch(err => console.log(err));

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//settings
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index);
app.use('/users', user);

app.set('port', process.env.PORT || 1234);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 4. Force https in production
if (app.get('env') === 'production') {
    app.use(function(req, res, next) {
      var protocol = req.get('x-forwarded-proto');
      protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
  }

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

let port = app.get('port');

app.listen(app.get('port'), () => {
    console.log('Server is up and running on port numner ' + port);
});