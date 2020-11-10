import { Router } from 'express'
import { ToolController } from '@controllers'
import { checkJwt, validateToolBody } from '@middlewares'

export function toolRouter () {
  const router = Router()
  const controller = new ToolController()

  router.get('/', controller.getMany)
  router.get('/:id', controller.get)
  router.use(checkJwt)
  router.post('/', validateToolBody, controller.new)
  router.delete('/:id', controller.delete)

  return router
}
