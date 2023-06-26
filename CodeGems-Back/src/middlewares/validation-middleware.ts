import { invalidDataError } from '@/errors/invalid-data-error'
import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'body')
}

export function validateParams<T>(
  schema: ObjectSchema<T>,
): ValidationMiddleware {
  return validate(schema, 'params')
}

export function validateQuery<T>(
  schema: ObjectSchema<T>,
): ValidationMiddleware {
  return validate(schema, 'query')
}

function validate(schema: ObjectSchema, type: 'body' | 'params' | 'query') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    })
    if (!error) {
      next()
    } else {
      const details: string[] = error.details.map((d) => d.message)
      throw invalidDataError(details)
    }
  }
}
