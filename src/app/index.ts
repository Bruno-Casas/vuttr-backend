import 'reflect-metadata'
import express, { Application } from 'express'
import { errorHandlerFunction } from '@middlewares'
import { createConnection } from 'typeorm'
import { config } from '@config'
import { exit } from 'process'

export default async function initApp (startLogs: boolean = false) : Promise<Application> {
  const environment = process.env.ENVIRONMENT || 'test'
  if (startLogs) console.log(`AppInfo: Starting application in the ${environment} environment.`)

  await createConnection(config.connection)
    .then(() => startLogs ? console.log('AppInfo: Connected to the database.') : undefined)
    .catch(err => {
      console.error(err)
      exit(1)
    })

  const app = express()

  app.use(express.json())
  app.use('/', (await import('@routes')).default)
  app.use(errorHandlerFunction)

  return app
}
