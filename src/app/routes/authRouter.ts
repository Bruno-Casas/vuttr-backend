import { Router } from 'express'
import { AuthController } from '@controllers'
import { checkJwt } from '@middlewares'

export function authRouter () {
  const router = Router()
  const controller = new AuthController()

  router.post('/', controller.auth)
  router.use(checkJwt)

  return router
}
