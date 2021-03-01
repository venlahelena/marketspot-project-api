var Joi = require('@hapi/joi')

//Validation schemas

var createValidation = (data) => {
    var schema = {
        image: Joi.string()
            .min(1)
    };

    return Joi.validate(data, schema);
};

module.exports.createValidation = createValidation;