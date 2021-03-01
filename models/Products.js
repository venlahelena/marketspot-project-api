const { boolean } = require('@hapi/joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create schema object
var ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Boolean,
    },
    pickup: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Products = mongoose.model('products', ProductSchema);