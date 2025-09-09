const Joi = require('joi');

const featuresJoi = Joi.object({
    name: Joi.string()
        .max(20)
        .required()
        .messages({
            'string.base': `"name" should be a type of 'text'`,
            'string.empty': `"name" cannot be empty`,
            'string.max': `"name" must be at most 20 characters`,
            'any.required': `"name" is required`
        }),

    description: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': `"description" should be a type of 'text'`,
            'string.empty': `"description" cannot be empty`,
            'string.max': `"description" must be at most 255 characters`,
            'any.required': `"description" is required`
        })
});

module.exports = { featuresJoi };
