const Joi = require("joi");

module.exports.customerValidator = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  mobile: Joi.string().required(),
});
