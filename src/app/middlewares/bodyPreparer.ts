import { HttpError } from '@specs/errors'
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'
import { validateOrReject, ValidationError } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export function bodyPreparer (targetClass:ClassType<unknown>) {
  return (request:Request, response:Response, next:NextFunction) => {
    request.body = plainToClass(targetClass, request.body)

    validateOrReject(request.body)
      .then(() => next())
      .catch((errors:Array<ValidationError>) => {
        const httpError = new HttpError('Some attribute does not meet the requirements', 422)
        let badRequest = false

        const details = errors.map(error => {
          const { property, constraints } = error

          if (error.constraints.isDefined) {
            httpError.setMessage('Some property has not been defined')
            httpError.setCode(400)
            badRequest = true
          }
          return { property, constraints }
        })

        if (!badRequest) {
          httpError.setDetails(details)
        }

        next(httpError)
      })
  }
}
