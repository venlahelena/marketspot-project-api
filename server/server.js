const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const mongoose = require('mongoose');


const products = require('./routes/products');
const users = require('./routes/users');
const signup = require('./routes/signup');
const login = require('./routes/login');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use(cors());


dotenv.config();

//Connect to mongoose database
mongoose
    .connect( process.env.DB_CONNECT, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

//Routes
app.use('/products', products);
app.use('/users', users);
app.use('/signup', signup);
app.use('/login', login);
app.use('/images', express.static('images'));

app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function() {
    console.log('App is running on port', app.get('port'));
});

module.exports = app;