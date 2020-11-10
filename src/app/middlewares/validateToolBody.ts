import { ToolDto } from '@specs/interfaces'
import { HttpError } from '@specs/errors'
import { NextFunction, Request, Response } from 'express'
import { merge as objectMapper } from 'object-mapper'
import { mapRequestBodyToToDto } from '@specs/maps'

export function validateToolBody (request:Request, response:Response, next:NextFunction) {
  const toolDto = objectMapper(request.body, mapRequestBodyToToDto) as ToolDto

  if (Object.values(toolDto).some(value => value === null)) {
    return next(new HttpError('Missing required attribute', 400))
  }

  if (!toolDto.tags.length) {
    return next(new HttpError('At least one tag is required', 406))
  }

  request.body = toolDto
  next()
}
