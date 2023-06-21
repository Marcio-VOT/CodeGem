import Joi from 'joi'

export const searchPlaylistSchema = Joi.object({
  userId: Joi.number(),
  tags: Joi.array().items(Joi.string()),
  level: Joi.string().valid('JUNIOR', 'PLENO', 'SENIOR'),
})
