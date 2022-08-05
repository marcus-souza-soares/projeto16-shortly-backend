import joi from 'joi';

const schemaUrl =
    joi.object({
        url: joi.string().required()
    })

export default schemaUrl;