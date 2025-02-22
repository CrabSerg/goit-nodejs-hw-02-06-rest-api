const Joi = require("joi");

const addSchema = Joi.object({
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
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
  .pattern(/^[+0-9]{13}$/),
  favorite: Joi.boolean(),
}).min(1);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
  joiRegisterSchema,
  joiSubscriptionSchema,
  joiLoginSchema,
  joiVerifyEmailSchema,
};

module.exports = schemas;

