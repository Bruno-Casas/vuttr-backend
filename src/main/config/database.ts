import * as dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'
import { Entities } from '@entities/index'
dotenv.config()

const configuration: { dev: ConnectionOptions; prod: ConnectionOptions } = {
  dev: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'wellt',
    synchronize: true,
    logging: false,
    entities: Entities
  },

  prod: {
    type: undefined,
    host: undefined,
    port: null,
    username: undefined,
    password: undefined,
    database: undefined,
    synchronize: true,
    logging: false,
    entities: Entities
  }
}

export function dbConfig (): ConnectionOptions {
  const environment = process.env.ENVIRONMENT || 'dev'

  return configuration[environment]
}
