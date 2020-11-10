import { HttpError } from '@specs/errors'
import { NextFunction, Request, Response } from 'express'
import { merge as objectMapper } from 'object-mapper'
import { mapRequestBodyToUser } from '@specs/maps'
import { User } from '@entities'

export function validateUserBody (request:Request, response:Response, next:NextFunction) {
  const usernameReg = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/
  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const user = objectMapper(request.body, mapRequestBodyToUser) as User

  if (Object.values(user).some(value => value === null)) {
    return next(new HttpError('Missing required attribute', 400))
  }

  if (!usernameReg.test(user.username)) {
    return next(new HttpError('Invalid username', 422))
  }

  if (!emailReg.test(user.email)) {
    return next(new HttpError('Invalid email', 422))
  }

  request.body = user
  next()
}
