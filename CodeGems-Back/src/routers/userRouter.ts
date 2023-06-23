import { userDataFromId } from '@/controllers/user-controller'
import { Router } from 'express'

const userRouter = Router()

userRouter.get('/:userId', userDataFromId)

export default userRouter
