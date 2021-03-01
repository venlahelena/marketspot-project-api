var express = require('express');
var multer = require('multer');
var router = express.Router();

var auth = require('./auth');

var { createValidation, updateValidation} = require('../schemas/products');

//Import Product Model
var Product = require('../models/Products');

 //Where to store uploaded images
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});


//GET all /products
router.get('/', async (req, res) => {
    try {
        var products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(404).json(err);
    }
}); 

//POST /Products
router.post('/', upload.single('image'), async (req, res) => {

    var { error } = createValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var product = new Product({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            location: req.body.location,
            price: req.body.price,
            image: req.file.path,
            deliveryType: req.body.deliveryType,
        });

    try {
        var newProduct = await product.save();
        res.status(200).json(newProduct);

    } catch(err) {
        res.status(404).json(err);
    }      
});

//DELETE Product
router.delete('/:id', auth, async (req, res) => {

    try {
        var deleteProduct = await Product.remove({ _id: req.params.id });
        res.status(200).json(deleteProduct);

    } catch (err) {
        res.status(404).json(err);
    }
});

//Get single product
router.get('/:id', async (req, res) => {
    try {
        var product = await Product.findById(req.params.id)

        if(!product) throw Error('Product not found');
            res.status(200).json(product);

        } catch(err) {
            res.status(404).json(err);
    }
});

//UPDATE Product
//Not ideal, but works
router.put('/:id', auth, async (req, res) => {

    try {
        
    var updatedProduct = await Product.updateOne(
        { _id: req.params.id },
        { $set: { title: req.body.title, 
                  description: req.body.description,
                  category: req.body.category,
                  location: req.body.location,
                  price: req.body.price,
                  image: req.file.path,
                  deliveryType: req.body.deliveryType,
                }
            });

        res.status(200).json(updatedProduct);

    } catch (err) { 
        res.status(404).json(err);
    }        
});

module.exports = router;