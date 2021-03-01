var router = require('express').Router();
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');

var Image = require('../models/Images');

// Config cloudinary storage for multer-storage-cloudinary
var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: '', // give cloudinary folder where you want to store images
    allowedFormats: ['jpg', 'png'],
});

var upload = multer({ storage: storage });


router.post('/', upload.single('image'), function (req, res) {
    console.log(req.file);
    res.status(201);
    res.json(req.file);
});

module.exports = router;
