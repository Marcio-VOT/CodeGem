import Joi from 'joi'

export const userDataSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  image: Joi.string().required(),
}).required()

export const logonValidationSchema = Joi.object({
  user: userDataSchema,
  account: Joi.object({
    provider: Joi.string().valid('github', 'google').required(),
    access_token: Joi.string().required(),
  }).required(),
})
