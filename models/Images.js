var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create schema object
var ImageSchema = new Schema({
    image: {
        type: String,
    },
});

module.exports = Products = mongoose.model('images', ImageSchema);