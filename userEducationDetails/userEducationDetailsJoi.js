const Joi = require('joi');

const userEducationDetailsJoi = Joi.object({
    userId: Joi.number().required().messages({
        'any.required': '"userId" is required',
        'number.base': '"userId" must be a number'
    }),
    educationTitle: Joi.string().required().messages({
        'any.required': '"EducationTitle" is required',
        'string.empty': '"EducationTitle" cannot be an empty field'
    }),
    description: Joi.string().required().messages({
        'any.required': '"Description" is required',
        'string.empty': '"Description" cannot be an empty field'
    }),
    passingYear: Joi.string().required().messages({
        'any.required': '"PassingYear" is required',
        'string.empty': '"PassingYear" cannot be an empty field'
    }),
})

module.exports = {
    userEducationDetailsJoi
};
