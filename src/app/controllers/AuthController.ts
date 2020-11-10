import { NextFunction, Request, Response } from 'express'
import { User } from '@entities'
import { AuthService, UserService } from '@services'
import { HttpError } from '@specs/errors'

const authService = new AuthService()
const userService = new UserService()

export class AuthController {
  async auth (request: Request, response: Response, next:NextFunction) {
    const {
      username,
      email,
      password
    }: User = request.body

    const user = await userService.findByUsernameOrEmail(username, email, ['id', 'password'])

    if (!user) {
      next(new HttpError('This user does not exist', 404))
    }

    authService.authenticate(user, password)
      .then(token => response.json({ token }))
      .catch(next)
  }
}
