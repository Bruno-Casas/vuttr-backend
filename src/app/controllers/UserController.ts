import { NextFunction, Response } from 'express'
import { User } from '@entities'
import { UserService } from '@services'
import { Request } from '@specs/interfaces'
import { HttpError } from '@specs/errors'

const userService = new UserService()

export class UserController {
  async new (request: Request, response: Response, next:NextFunction) {
    const user = request.body as User

    userService.save(user)
      .then(user => {
        delete user.password
        delete user.active

        response.status(201).json(user)
      })
      .catch(next)
  }

  async get (request: Request, response: Response, next:NextFunction) {
    const userId = request.data.userId
    const user = await userService.find(userId)

    if (!user) {
      return next(new HttpError('User not found', 404))
    }

    response.json(user)
  }

  async update (request: Request, response: Response, next:NextFunction) {
    const user = request.body as User
    const userId = Number(request.data.userId)

    userService.update(userId, user)
      .then(() => {
        response.status(204).send()
      })
      .catch(next)
  }

  async delete (request: Request, response: Response, next:NextFunction) {
    const userId = Number(request.data.userId)

    userService.remove(userId)
      .then(() => {
        response.status(204).send()
      }).catch(next)
  }
}
