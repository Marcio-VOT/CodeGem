import 'express-async-errors'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { connectDb, disconnectDB } from './config/prisma'
import router from './routers/routers'
import cookieParser from 'cookie-parser'
import { handleApplicationErrors } from './middlewares/error-handling-middleware'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app
  .use(cors())
  .use(express.json())
  .use(cookieParser())
  .use(router)
  .get('/health', (_req: Request, res: Response) => {
    return res.status(200).send('OK!')
  })
  .use(handleApplicationErrors)

export function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB()
}

export default app
