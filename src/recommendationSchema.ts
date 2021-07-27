import joi from 'joi';
import { expectedRecommendationBody } from './Protocols/interface';

const recommendationSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.required()
})

export {
    recommendationSchema
}