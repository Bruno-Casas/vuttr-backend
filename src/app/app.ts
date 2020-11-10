import 'reflect-metadata'
import express from 'express'
import { authRouter, toolRouter, userRouter } from '@routes'
import { errorHandlerFunction } from '@middlewares'

const app = express()

app.use(express.json())

app.use('/auth', authRouter())
app.use('/tools', toolRouter())
app.use('/user', userRouter())
app.use(errorHandlerFunction)
export { app }
