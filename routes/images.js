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

var parser = multer({ storage: storage });


router.post('/', parser.single('image'), function (req, res) {
    
    var image = new Image({
        image: req.file.path
    })
    res.status(200).json(image)
});

module.exports = router;
