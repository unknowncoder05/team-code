const Joi = require('joi');

export const projectSchema = Joi.object({
    name: Joi.string()
        .regex(/^\w+(?:\s+\w+)*$/)
        .min(3)
        .max(30)
        .required(),

    description: Joi.string()
        .regex(/^\w+(?:\s+\w+)*$/)
        .max(300),

    location: Joi.string()
        .min(1)
        .max(100)
        .required(),

})