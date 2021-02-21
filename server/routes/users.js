const express = require('express');
const router = express.Router();

//Import User Model
const Users = require('../models/Users');

router.get('/', async (req, res) => {

  try {

      const users = await Users.find();

      if (!users) throw Error('No users found');
      res.json(users);

  } catch (err) {
      res.status(404).json(err);
  }
});

router.get('/:id', async (req, res) => {

  try {

      const user = await Users.findById(req.params.id);

      if(!user) throw Error('User not found');
          res.status(200).json(user);

    } catch(err) {
        res.status(404).json(err);
    }
});

module.exports = router;