const bcrypt = require('bcrypt');
const router = require('express').Router();
const Users = require('../models/Users');

const { signupValidation } = require('../schemas/users');

router.post('/', async (req, res) => {

    //User data validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email already exists
    const email = await Users.findOne({ email: req.body.email});
    if(email) return res.status(400).send('Email already exists');

    //Hash users password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

       const users = new Users({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                password: hashedPassword,
            });

            try {
                const newUser = await users.save();
                res.status(200).json({ user: users._id});

            } catch (err) {
                res.status(404).json(err);
            }
});

module.exports = router;