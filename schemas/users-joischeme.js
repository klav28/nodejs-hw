import Joi from "joi";

const usersRegisterSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "missing fields" }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .messages({ "any.required": "missing fields" }),
  // email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const usersSigninSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .messages({ "any.required": "missing fields" }),
  password: Joi.string().min(6).required(),
});

export default {
  usersRegisterSchema,
  usersSigninSchema,
};
