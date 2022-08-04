import joi from 'joi';

const schemaSignup = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
})

const schemaSignin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})


export { schemaSignup, schemaSignin };