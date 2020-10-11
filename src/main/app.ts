import express from 'express'
import toolRouter from '@routes/toolRouter'
const app = express()

app.use(express.json())
app.use('/tools', toolRouter())

export = app;
