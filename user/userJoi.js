const Joi = require('joi');

const userJoi = Joi.object({
    firstName: Joi.string().required().messages({
        'any.required': '"FirstName" is required',
        'string.empty': '"FirstName" cannot be an empty field'
    }),
    lastName: Joi.string().required().messages({
        'any.required': '"LastName" is required',
        'string.empty': '"LastName" cannot be an empty field'
    }),
    dob: Joi.date().iso().required().messages({
        'any.required': '"DOB" is required',
        'date.format': '"DOB" must be in ISO format'
    }),
    userImg: Joi.string().uri().optional().messages({
        'string.uri': '"UserImg" must be a valid URL'
    }),
    userTypeId: Joi.number().required().messages({
        'any.required': '"UserTypeId" is required',
        'number.base': '"UserTypeId" must be a number'
    }),
    
})

module.exports={
    userJoi
}


