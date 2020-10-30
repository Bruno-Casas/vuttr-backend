import 'reflect-metadata'
import express from 'express'
import toolRouter from '@routes/toolRouter'
import userRouter from '@routes/userRouter'
import authRouter from '@routes/authRouter'

const app = express()

app.use(express.json())
app.use('/auth', authRouter())
app.use('/tools', toolRouter())
app.use('/user', userRouter())

export { app }
