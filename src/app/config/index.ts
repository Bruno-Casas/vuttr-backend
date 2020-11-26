import { ConfigLoader } from '@modules/config-loader'
import * as entities from '@entities'
import { resolve } from 'path'
import { AppConfig } from '@specs/interfaces'

export const config = new ConfigLoader(resolve(__dirname, '../..', 'config'), {
  jsonSchema: require('./AppConfigSchema.json') as object,
  defaultConfig: require('./defaultConfig.json') as object,
  environment: process.env.ENV,
  setProps: [{
    path: 'database.entities',
    value: Object.values(entities)
  }]
}).getConfig() as AppConfig
