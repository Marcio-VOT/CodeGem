import Joi from 'joi'

export const searchPlaylistSchema = Joi.object({
  userId: Joi.custom(joiUserIdValidation),
  tags: Joi.array().items(Joi.string()),
  level: Joi.string().valid('JUNIOR', 'PLENO', 'SENIOR'),
}).required()

export function joiUserIdValidation(
  value: string,
  helpers: Joi.CustomHelpers<string>,
) {
  if (!value) return value

  if (isNaN(Number(value))) {
    return helpers.error('any.invalid')
  } else return value
}
