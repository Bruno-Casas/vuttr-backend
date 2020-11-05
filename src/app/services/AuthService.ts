import { jwtSecret } from '@config/app'
import { User } from '@entities/User'
import { compareSync as compareHash } from 'bcrypt'
import { sign as jwtSing } from 'jsonwebtoken'

export class AuthService {
  async authenticate (user: User, password: string) : Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const userAuthenticated = compareHash(password, String(user.password))

      if (userAuthenticated) {
        const token = jwtSing({ userId: user.id }, jwtSecret, { expiresIn: '24h' })

        resolve(token)
      } else {
        reject(new Error('Invalid password'))
      }
    })
  }
}
