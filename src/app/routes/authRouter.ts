import { Router } from 'express'
import { AuthController } from '@controllers/AuthController'
import { checkJwt } from '@middlewares/checkJwt'

const authRouter = function () {
  const router = Router()
  const controller = new AuthController()

  router.post('/', controller.auth)
  router.use(checkJwt)

  return router
}

export default authRouter
