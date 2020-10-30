import { Router } from 'express'
import { UserController } from '@controllers/UserController'
import { checkJwt } from '@middlewares/checkJwt'

const userRouter = function () {
  const router = Router()
  const controller = new UserController()

  router.post('/', controller.new)

  router.use(checkJwt)

  router.get('/', controller.get)
  router.delete('/', controller.delete)

  return router
}

export default userRouter
