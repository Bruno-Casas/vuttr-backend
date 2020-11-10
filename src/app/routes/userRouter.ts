import { Router } from 'express'
import { UserController } from '@controllers'
import { checkJwt, validateUserBody } from '@middlewares'

export function userRouter () {
  const router = Router()
  const controller = new UserController()

  router.post('/', validateUserBody, controller.new)

  router.use(checkJwt)

  router.get('/', controller.get)
  router.delete('/', controller.delete)

  return router
}
