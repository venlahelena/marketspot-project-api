const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema object
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    productImg: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    deliveryType: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Products = mongoose.model('products', ProductSchema);