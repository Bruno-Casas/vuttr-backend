import { sign as jwtSing } from 'jsonwebtoken'
import { jwtSecret } from '@config'

export function generateTestToken (userId:number) {
  return jwtSing({ userId: userId }, jwtSecret, { expiresIn: '1h' })
}
