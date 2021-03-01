var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create schema object
var ImagesSchema = new Schema({
    image: {
        type: String,
        require: false,
    },
});

module.exports = Images = mongoose.model('images', ImagesSchema);