const Joi = require('joi');

const email = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(10)
    .max(70)
    .required(),

    password = Joi.string()// add Password complexity check + most used passwords
        .min(8)
        .max(100)
export const createUserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(30)
        .required(),

    email,
    password: password.required()
})

export const loginUserSchema = Joi.object({
    email,
    password: password.required()
})