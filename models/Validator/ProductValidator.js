const Joi = require("joi");

module.exports.ProductValidator = Joi.object({
    product_name: Joi.string().required(),
    Price: Joi.string().required(),
    quantity: Joi.string().required(),
    weight: Joi.string().required(),
    description: Joi.string().required(),
});