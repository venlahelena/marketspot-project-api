var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create schema object
var imageSchema = new Schema({
        name: String,
        desc: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
});

module.exports = new mongoose.model('image', imageSchema);