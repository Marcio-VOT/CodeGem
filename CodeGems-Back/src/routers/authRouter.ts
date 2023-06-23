import { singInPost } from '@/controllers/authentication-controller'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('', singInPost)

export default authRouter
