const Joi = require('joi');

const rolesJoi = Joi.object({
    name: Joi.string()
        .max(20)
        .required()
        .messages({
            'string.base': `"Name" must be a string`,
            'string.max': `"Name" must be at most 20 characters`,
            'any.required': `"Name" is required`,
            'string.empty': `"Name" cannot be empty`
        }),

    description: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': `"Description" must be a string`,
            'string.max': `"Description" must be at most 255 characters`,
            'any.required': `"Description" is required`,
            'string.empty': `"Description" cannot be empty`
        })
});

module.exports = {
    rolesJoi
};
