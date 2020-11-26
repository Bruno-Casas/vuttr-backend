import { sign as jwtSing } from 'jsonwebtoken'
import { config } from '@config'

export function generateTestToken (userId:number) {
  return jwtSing({ userId: userId }, config.jwtSecret, { expiresIn: '1h' })
}
