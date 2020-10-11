import * as dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'
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
    entities: ['src/main/entities/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts']
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
    entities: ['src/main/entities/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts']
  }
}

export function dbConfig (): ConnectionOptions {
  const environment = process.env.ENVIRONMENT

  return configuration[environment]
}
