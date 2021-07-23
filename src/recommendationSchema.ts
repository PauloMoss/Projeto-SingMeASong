import joi from 'joi';

const recommendationSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.required()
})

export {
    recommendationSchema
}