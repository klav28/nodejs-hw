import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const usersSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .pattern(emailRegexp)
    .messages({ "any.required": "missing fields" }),
  password: Joi.string().min(6).required(),
});

export default {
  usersSchema,
};
