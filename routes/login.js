var router = require('express').Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var { loginValidation } = require('../schemas/users');
var Users = require('../models/Users');

router.post('/', async (req, res) => {

    //Validate incomin user data
    var { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error-details[0].message);

    //Check of email is correct
    var user = await Users.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email or password does not exists');

    //Check if password is correct
    var password = await bcrypt.compare(req.body.password, user.password);
    if(!password) return res.status(400).send('Email or password does not exists');

    //Create jtw token
    var token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
    res.header('auth', token).send(token);
 
});

module.exports = router;