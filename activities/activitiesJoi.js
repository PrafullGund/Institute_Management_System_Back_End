const Joi = require('joi');

const activitiesJoi = Joi.object({
  activityTypeId: Joi.number().integer().required(),
  activityStatusId: Joi.number().integer().required(),
  dueDate: Joi.date().required(),
  salesRepresentativeId: Joi.number().integer().required(),
  summary: Joi.string().required()
});

module.exports = { activitiesJoi };
