import { expect, test, beforeAll } from 'vitest'
import httpStatus from 'http-status'
import supertest from 'supertest'
import app, { init } from '../src/app'

beforeAll(async () => {
  await init()
})

const server = supertest(app)

test('should respond with status 200 with OK! text', async () => {
  console.log(process.env.TYPE)
  const response = await server.get('/health')

  expect(response.status).toBe(httpStatus.OK)
  expect(response.text).toBe('OK!A')
})
