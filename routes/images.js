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


router.post('/', upload.single('image'), async (req, res) => {

    var image = new Image({
        image: req.file.path,
    })

    try {
        var newImage = await image.save();
        res.status(200).json(newImage);

    } catch (err) {
        res.status(404).json(err);
    }
});

module.exports = router;
