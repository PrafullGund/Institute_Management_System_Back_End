const Joi = require('joi');

const activityTypesJoi = Joi.object({
    typeName: Joi.string().max(50).required()
});

module.exports = { activityTypesJoi };
