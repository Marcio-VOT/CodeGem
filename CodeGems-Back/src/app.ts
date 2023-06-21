import 'express-async-errors'
import express, { Express } from 'express'
import cors from 'cors'
import { connectDb, disconnectDB } from './config/prisma'
import router from './routers/routers'
import cookieParser from 'cookie-parser'
import { handleApplicationErrors } from './middlewares/error-handling-middleware'

const app = express()

app
  .use(cors())
  .use(express.json())
  .use(cookieParser())
  .use(router)
  .use(handleApplicationErrors)

export function init(): Promise<Express> {
  connectDb()
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB()
}

export default app
