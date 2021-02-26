var Joi = require('@hapi/joi')

//Validation schemas

var createValidation = (data) => {
var schema = {
    title: Joi.string()
        .min(5)
        .max(10)
        .required(),
    description: Joi.string()
        .min(10)
        .required(),
    category: Joi.string()
        .min(1)
        .max(15)
        .required(),
    location: Joi.string()
        .min(6)
        .required(),
    productImg: Joi.string()
        .min(999),
    price: Joi.number()
        .min(0)
        .max(9999)
        .required(),
    deliveryType: Joi.string()
        .min(1)
        .max(10)
        .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.createValidation = createValidation;