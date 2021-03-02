var router = require('express').Router();
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');

var Image = require('../models/Images');

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'images',
    allowedFormats: ['jpg', 'png'],
});

var upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {

    var img = new Image ({
        image: req.file.path
      });

      try {

        var newImg = await img.save();
        res.status(400).json(newImg)

      } catch {

        res.status(404).json(err);
        console.log(err);

      }
});


module.exports = router;
