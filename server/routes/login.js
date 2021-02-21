const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { loginValidation } = require('../schemas/users');
const Users = require('../models/Users');

router.post('/', async (req, res) => {

    //Validate incomin user data
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error-details[0].message);

    //Check of email is correct
    const user = await Users.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email or password does not exists');

    //Check if password is correct
    const password = await bcrypt.compare(req.body.password, user.password);
    if(!password) return res.status(400).send('Email or password does not exists');

    //Create jtw token
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
    res.header('auth', token).send(token);
 
});

module.exports = router;