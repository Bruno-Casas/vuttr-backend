import { jwtSecret } from '@config'
import { User } from '@entities'
import { HttpError } from '@specs/errors'
import { compareSync as compareHash } from 'bcrypt'
import { sign as jwtSing } from 'jsonwebtoken'

export class AuthService {
  async authenticate (user: User, password: string) {
    const userAuthenticated = compareHash(password, String(user.password))

    if (!userAuthenticated) {
      throw new HttpError('Invalid password', 401)
    }
    return jwtSing({ userId: user.id }, jwtSecret, { expiresIn: '24h' })
  }
}
