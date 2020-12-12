import { parse } from 'yaml'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import Ajv from 'ajv'
import { AppConfig } from '@specs/interfaces'

interface loaderOptions {
  environment?: string,
  jsonSchema?: object,
  defaultConfig?: object
  propDefinitions?: {
    [key: string]: {
      env?: string,
      value?: any
    }
  } | { [key: string]: any }
}

export class ConfigLoader {
  private configDir: string
  private environment: string
  private validator: Ajv.ValidateFunction
  private config: object

  constructor (configDir: string, options?: loaderOptions) {
    this.configDir = configDir
    this.environment = options.environment || process.env.ENVIRONMENT

    if (options.jsonSchema) {
      this.validator = new Ajv().compile(options.jsonSchema)
      const defaultIsValid = this.validator(options.defaultConfig)

      if (!defaultIsValid) throw new Error('Invalid default config')

      this.config = options.defaultConfig
    }

    this.createConfig(options.propDefinitions)
  }

  private createConfig (propDefs: loaderOptions['propDefinitions'] = {}) {
    this.loadConfig()

    Object.keys(propDefs).forEach(path => {
      let targetObject = this.config
      const pathKeys = path.split('.')
      const prop = pathKeys.pop()

      pathKeys.forEach(key => {
        targetObject = targetObject[key] ? targetObject[key] : (targetObject[key] = {})
      })

      const propDefinition = propDefs[path]

      targetObject[prop] = propDefinition.env || propDefinition.value
        ? process.env[propDefinition.env] || propDefinition.value || targetObject[prop]
        : propDefinition
    })
  }

  public getConfig () {
    return this.config
  }

  public getSpecificConfig (path: string) {
    return this.config[path]
  }

  private loadConfig () {
    const configPath = this.getConfPath()

    this.config = configPath
      ? parse(readFileSync(configPath, 'utf-8')) as AppConfig
      : this.config

    if (!this.validator(this.config)) {
      console.log(this.validator.errors)
      // exit(1)
    }
  }

  private getConfPath () {
    let configPath = resolve(dirname(require.main.filename), 'config.yml')

    return this.environment === 'prod' && existsSync(configPath)
      ? configPath
      : existsSync((configPath = resolve(this.configDir, `config-${this.environment}.yml`)))
        ? configPath
        : resolve(this.configDir, 'config-default.yml')
  }
}
