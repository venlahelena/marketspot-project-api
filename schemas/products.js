var Joi = require('@hapi/joi')

//Validation schemas

var createValidation = (data) => {
var schema = {
    title: Joi.string()
        .min(5)
        .max(15)
        .required(),
    description: Joi.string()
        .min(1)
        .required(),
    category: Joi.string()
        .min(1)
        .max(20)
        .required(),
    location: Joi.string()
        .min(3)
        .required(),
    price: Joi.number()
        .min(0)
        .max(9999)
        .required(),
    deliveryType: Joi.string()
        .min(1)
        .max(20)
        .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.createValidation = createValidation;