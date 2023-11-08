const Joi = require("joi");

module.exports.SupplierValidator = Joi.object({
  company_name: Joi.string().required(),
  address: Joi.string().required(),
  gst_no: Joi.string().required(),
  email: Joi.string().required(),
  mobile: Joi.string().required(),
});