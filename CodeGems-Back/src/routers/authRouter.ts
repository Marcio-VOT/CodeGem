import { singInPost } from '@/controllers/authentication-controller'
// import { validateBody } from '@/middlewares/validation-middleware'
// import { logonValidationSchema } from '@/schemas/auth-schemas'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('', singInPost)

export default authRouter
