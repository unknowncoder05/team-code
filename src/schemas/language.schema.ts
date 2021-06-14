const Joi = require('joi');

export const languageSchema = Joi.object({
    name: Joi.string()
        .regex(/^\w+(?:\s+\w+)*$/)
        .min(3)
        .max(30)
        .required(),

})