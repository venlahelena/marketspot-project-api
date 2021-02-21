var Joi = require('@hapi/joi')

//Validation schemas

var signupValidation = (data) => {
var schema = {
    name: Joi.string()
        .min(3)
        .required(),
    lastname: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    phonenumber: Joi.number()
        .min(6)
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
    };

    return Joi.validate(data, schema);
};

var loginValidation = (data) => {
    var schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        };

        return Joi.validate(data, schema);
    };

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;