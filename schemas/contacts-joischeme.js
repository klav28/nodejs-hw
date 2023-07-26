import Joi from "joi";

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "missing fields" }),
  phone: Joi.string().required().messages({ "any.required": "missing fields" }),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .messages({ "any.required": "missing fields" }),
  favorite: Joi.boolean(),
});

const contactsUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default {
  contactsAddSchema,
  contactsUpdateFavoriteSchema,
};
