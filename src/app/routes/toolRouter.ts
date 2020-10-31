import { Router } from 'express'
import { ToolController } from '@controllers/ToolController'
import { checkJwt } from '@middlewares/checkJwt'

const toolRouter = function () {
  const router = Router()
  const controller = new ToolController()

  router.get('/', controller.getMany)
  router.get('/:id', controller.get)
  router.use(checkJwt)
  router.post('/', controller.new)
  router.delete('/:id', controller.delete)

  return router
}

export default toolRouter
