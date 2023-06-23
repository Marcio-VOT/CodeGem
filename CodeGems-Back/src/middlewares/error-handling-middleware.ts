import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApplicationError } from '@/protocols'

export function handleApplicationErrors(
  err: (ApplicationError | Error) & { details?: string[]; code?: string },
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.log(err)
  if (err.name === 'ConflictError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    })
  }

  if (err.code === 'P2025') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    })
  }

  if (err.name === 'InvalidProviderError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    })
  }

  if (err.name === 'InvalidDataError') {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
      details: err.details,
    })
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    })
  }

  if (err.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    })
  }

  /* eslint-disable-next-line no-console */
  console.error(err.name)
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  })
}
