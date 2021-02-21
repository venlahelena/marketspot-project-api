var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var dotenv = require('dotenv');
var mongoose = require('mongoose');

var products = require('./routes/products');
var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var auth = require('./routes/auth');

var app = express();

app.use(bodyParser.json());
app.use(cors());

dotenv.config();

app.set('port', (process.env.PORT || 80));

app.get('/', function(req, res) {
    res.send('Marketspot');
})

//Connect to mongoose database
mongoose
    .connect( process.env.MONGODB_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

//Routes
app.use('/products', products);
app.use('/users', users);
app.use('/signup', signup);
app.use('/login', login);
app.use('/images', express.static('images'));


app.listen(app.get('port'), function() {
    console.log('App is running on port', app.get('port'));
});

module.exports = app;