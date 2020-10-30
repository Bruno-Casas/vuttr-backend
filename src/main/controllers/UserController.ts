import { Response } from 'express'
import { UserDTO } from '@customTypes/UserDTO'
import { User } from '@entities/User'
import { UserService } from '@services/UserService'
import { Request } from '@customTypes/EraRequest'
import { HttpError } from '../errors/HttpError'

const userService = new UserService()

export class UserController {
  async new (request: Request, response: Response) {
    const {
      username,
      email,
      password
    }: UserDTO = request.body

    const user = new User()
    user.username = username
    user.email = email
    user.password = password

    userService.save(user)
      .then(user => {
        delete user.password
        delete user.active

        response.status(201).json(user)
      })
      .catch((err: HttpError) => {
        response.status(err.httpCode).json({ error: true, message: err.message })
      })
  }

  async get (request: Request, response: Response): Promise<Response> {
    const userId = request.data.userId
    const user = await userService.find(userId)

    if (!user) {
      return response.status(404).json({
        error: true,
        message: 'User not found'
      })
    }

    return response.json(user)
  }

  async delete (request: Request, response: Response) {
    const userId = Number(request.data.userId)

    userService.remove(userId)
      .then(() => {
        response.status(204).send()
      }).catch((err:HttpError) => {
        response.status(err.httpCode || 500).json({
          error: true,
          message: err.message
        })
      })
  }
}
