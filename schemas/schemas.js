const Joi = require("joi");
const schemaAdd = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  phone: Joi.string()
  .pattern(/^[+0-9]{13}$/)
  .required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(3).max(30),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.string()
  .pattern(/^[+0-9]{13}$/)
  .required(),
});

module.exports = { schemaAdd, schemaUpdate };
