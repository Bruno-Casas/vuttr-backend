import 'reflect-metadata'
import express, { Application } from 'express'
import { errorHandlerFunction } from '@middlewares'
import { createConnection } from 'typeorm'
import { config } from '@config'
import { exit } from 'process'

export default async function initApp () : Promise<Application> {
  await createConnection(config.database)
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
