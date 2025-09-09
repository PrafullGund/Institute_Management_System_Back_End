const Joi = require('joi');

const activityStatusJoi = Joi.object({
    statusName: Joi.string().max(20).required()
});

module.exports = { activityStatusJoi };
