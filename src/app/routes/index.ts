import { Router } from 'express'
import { authRouter } from './authRouter'
import { toolRouter } from './toolRouter'
import { userRouter } from './userRouter'

const router = Router()

router.use('/auth', authRouter())
router.use('/tools', toolRouter())
router.use('/user', userRouter())

export default router
