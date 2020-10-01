import express from 'express'
import toolRouter from '@routes/toolRouter'
import { createConnection } from 'typeorm'
const app = express()

createConnection()
	.then(conn => {
		console.log("Info: Connected to the database");
		app.use(express.json())
		app.use('/tools', toolRouter());
	})
	.catch(console.error)

export default app;
