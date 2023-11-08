const Joi = require("joi");

const loginValidator = Joi.object(
  {
    // email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    email: Joi.string().required(),
    password: Joi.string().min(4).required(),
  },
  {
    timestamps: true,
  }
);

module.exports = loginValidator;
