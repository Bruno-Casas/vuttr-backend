import { Router } from 'express'
import { UserController } from '@controllers'
import { bodyPreparer, checkJwt } from '@middlewares'
import { User } from '@entities'

export function userRouter () {
  const router = Router()
  const controller = new UserController()
  const preparer = bodyPreparer(User)

  router.post('/', preparer, controller.new)

  router.use(checkJwt)

  router.get('/', controller.get)
  router.delete('/', controller.delete)

  return router
}
