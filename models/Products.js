var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create schema object
var ProductSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    deliveryType: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Products = mongoose.model('products', ProductSchema);