var bcrypt = require('bcrypt');
var router = require('express').Router();
var Users = require('../models/Users');

var { signupValidation } = require('../schemas/users');

router.post('/', async (req, res) => {

    //User data validation
    var { error } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email already exists
    var email = await Users.findOne({ email: req.body.email});
    if(email) return res.status(400).send('Email already exists');

    //Hash users password
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(req.body.password, salt);

       var users = new Users({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                password: hashedPassword,
            });

            try {
                var newUser = await users.save();
                res.status(200).json({ user: users._id});

            } catch (err) {
                res.status(404).json(err);
            }
});

module.exports = router;