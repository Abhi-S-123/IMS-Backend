const Joi = require ('joi');

 const messageValidate = Joi.object({
    first_name:Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(4).required()
})


module.exports =  messageValidate;






































































// let Validator = require('validatorjs');







// module.exports.signUp = function (data) {
//     let rules = {
//         first_name : "required",
//         last_name : "required",
//         email : "required",
//         password : "required",
//     };
//     let validation = new Validator(data, rules, trans.validationLang());
//     validation.setAttributeNames(trans.validationFieldLang());
//     return validation;
// };