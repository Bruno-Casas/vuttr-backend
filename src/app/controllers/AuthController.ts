import { Request, Response } from 'express'
import { User } from '@entities/User'
import { AuthService } from '@services/AuthService'
import { UserService } from '@services/UserService'

const authService = new AuthService()
const userService = new UserService()

export class AuthController {
  async auth (request: Request, response: Response) {
    const {
      username,
      email,
      password
    }: User = request.body

    const user = await userService.findByUsernameOrEmail(username, email)

    authService.authenticate(user, password)
      .then(token => response.json({ token }))
      .catch((err:Error) => response.status(401).json({
        error: true,
        message: err.message
      }))
  }
}
