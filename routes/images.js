var router = require('express').Router();
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

var Image = require('../models/Images');

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'images',
    allowedFormats: ['jpg', 'png'],
});

var upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res, next) => {

    var imag = {
        image: req.file.path
      }
});

module.exports = router;
