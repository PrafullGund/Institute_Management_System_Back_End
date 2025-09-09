const Joi = require('joi');

const userCredentialsJoi = Joi.object({
    userId: Joi.number().required().messages({
        'any.required': '"userId" is required',
        'number.base': '"userId" must be a number'
    }),
    email: Joi.string().email().required().messages({
        'any.required': '"Email" is required',
        'string.email': '"Email" must be a valid email'
    }),
    mobile: Joi.string().required().messages({
        'any.required': '"Mobile" is required',
        'string.empty': '"Mobile" cannot be an empty field'
    }),
    password: Joi.string().required().messages({
        'any.required': '"Password" is required',
        'string.empty': '"Password" cannot be an empty field'
    }),
});

module.exports = {
    userCredentialsJoi
};
