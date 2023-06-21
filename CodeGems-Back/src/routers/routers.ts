import { Router } from 'express'
import authRouter from './authRouter'
import playlistRouter from './playlistRouer'

const router = Router()

router.use('/login', authRouter).use('/playlist', playlistRouter)

export default router
