import { Router } from 'express'
import { ToolController } from '@controllers/ToolController'

const toolRouter = function () {
	const router = Router();
	const controller = ToolController();

	router.post("/", controller.new)
	router.get("/", controller.getAll)
	router.get("/:id", controller.get)
	router.delete("/:id", controller.delete)

	return router;
}

export default toolRouter;
