const Joi = require('joi');

const userAddressJoi = Joi.object({
     userId: Joi.number().required().messages({
            'any.required': '"userId" is required',
            'number.base': '"userId" must be a number'
        }),
    addressLineOne: Joi.string().required().messages({
        'any.required': '"AddressLineOne" is required',
        'string.empty': '"AddressLineOne" cannot be an empty field'
    }),
    addressLineTwo: Joi.string().required().messages({
        'any.required': '"AddressLineTwo" is required',
        'string.empty': '"AddressLineTwo" cannot be an empty field'
    }),
    country: Joi.string().required().messages({
        'any.required': '"Country" is required',
        'string.empty': '"Country" cannot be an empty field'
    }),
    state: Joi.string().required().messages({
        'any.required': '"State" is required',
        'string.empty': '"State" cannot be an empty field'
    }),
    city: Joi.string().required().messages({
        'any.required': '"City" is required',
        'string.empty': '"City" cannot be an empty field'
    }),
    postalCode: Joi.string().required().messages({
        'any.required': '"PostalCode" is required',
        'string.empty': '"PostalCode" cannot be an empty field'
    })
});

module.exports = {
    userAddressJoi
};
