import Joi from 'joi'
import { joiUserIdValidation } from './playlist-schemas'

export const userIdObject = Joi.object({
  userId: Joi.number().custom(joiUserIdValidation).required(),
})
