import { ConfigLoader } from '@modules/config-loader'
import * as entities from '@entities'
import { resolve, dirname } from 'path'
import { AppConfig } from '@specs/interfaces'

export const config = new ConfigLoader(resolve(__dirname, '../..', 'config'), {
  jsonSchema: require('./AppConfigSchema.json') as object,
  defaultConfig: require('./defaultConfig.json') as object,
  propDefinitions: {
    port: {
      env: 'PORT'
    },
    jwtSecret: {
      env: 'APP_JWT_SECRET'
    },
    'connection.type': {
      env: 'TYPEORM_TYPE'
    },
    'connection.host': {
      env: 'TYPEORM_HOST'
    },
    'connection.port': {
      env: 'TYPEORM_PORT'
    },
    'connection.username': {
      env: 'TYPEORM_USERNAME'
    },
    'connection.password': {
      env: 'TYPEORM_PASSWORD'
    },
    'connection.database': {
      env: 'TYPEORM_DATABASE'
    },
    'connection.migrations': [resolve(dirname(require.main.filename), 'migrations/*.ts')],
    'connection.entities': Object.values(entities),
    'connection.extra.ssl': process.env.TYPEORM_SSL_ENABLE ? { rejectUnauthorized: false } : false
  }
}).getConfig() as AppConfig
