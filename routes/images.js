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

app.get('/', (req, res) => {
    Images.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});


router.post('/', upload.single('image'), (req, res, next) => {

    var image = {
        name: req.body.name,
        desc: req.body.desc,
        img:  {
            data: fs.readFileSync(path.join(__dirname + 'images/' + req.file.filename)),
            contentType: 'img/png'
        }
      }
      Images.create(image, (err, item) => {
          if(err) {
              console.log(err);
          } else {
              res.redirect('/');
          }
    })
});

module.exports = router;
