import { userDataFromId } from '@/controllers/user-controller'
import { validateParams } from '@/middlewares/validation-middleware'
import { userIdObject } from '@/schemas/user-schemas'
import { Router } from 'express'

const userRouter = Router()

userRouter.get('/:userId', validateParams(userIdObject), userDataFromId)

export default userRouter
