import { HttpError } from '@specs/errors'
import { NextFunction, Request, Response } from 'express'

export function errorHandlerFunction (error:HttpError, request:Request, response:Response, next:NextFunction) {
  response.status(error.httpCode || 500).json({
    success: false,
    message: error.message
  })
}
