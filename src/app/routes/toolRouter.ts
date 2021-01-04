import { Router } from 'express'
import { ToolController } from '@controllers'
import { bodyPreparer, checkJwt } from '@middlewares'
import { Tool } from '@entities'

export function toolRouter () {
  const router = Router()
  const controller = new ToolController()
  const preparer = bodyPreparer(Tool)

  router.get('/', controller.getMany)
  router.get('/:id', controller.get)
  router.use(checkJwt)
  router.post('/', preparer, controller.new)
  router.delete('/:id', controller.delete)

  return router
}
