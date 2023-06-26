import {
  userDataFromId,
  userDataFromSession,
} from '@/controllers/user-controller'
import { authenticateToken } from '@/middlewares/authentication-middleware'
import { validateParams } from '@/middlewares/validation-middleware'
import { userIdObject } from '@/schemas/user-schemas'
import { Router } from 'express'

const userRouter = Router()

userRouter
  .get('/:userId', validateParams(userIdObject), userDataFromId)
  .all('*', authenticateToken)
  .post('', userDataFromSession)

export default userRouter
