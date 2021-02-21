const Joi = require('@hapi/joi')

//Validation schemas

const createValidation = (data) => {
const schema = {
    title: Joi.string()
        .min(5)
        .required(),
    description: Joi.string()
        .min(10)
        .required(),
    category: Joi.number()
        .min(1)
        .max(5)
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
    deliveryType: Joi.number()
        .min(1)
        .max(2)
        .required(),
    };

    return Joi.validate(data, schema);
};

module.exports.createValidation = createValidation;