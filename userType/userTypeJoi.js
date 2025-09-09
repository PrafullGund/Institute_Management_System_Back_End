const Joi = require('joi');

const postUserTypeJoi = Joi.object({
    userTypeName: Joi.string().required().messages({
        'any.required': 'UserTypeName is required',
        'string.empty': 'UserTypeName cannot be empty',
    }),
    userTypeDescription: Joi.string().allow(null, '').messages({
        'string.empty': 'UserTypeDescription cannot be empty',
    }),
})

module.exports = { postUserTypeJoi }