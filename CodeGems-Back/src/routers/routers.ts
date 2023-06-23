import { Router } from 'express'
import authRouter from './authRouter'
import playlistRouter from './playlistRouer'
import userRouter from './userRouter'

const router = Router()

router
  .use('/login', authRouter)
  .use('/playlist', playlistRouter)
  .use('/user', userRouter)

export default router
