import { parse } from 'yaml'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import Ajv from 'ajv'
import { AppConfig } from '@specs/interfaces'

interface loaderOptions {
  environment:string,
  jsonSchema?:object,
  defaultConfig?: object
  setProps?: [{
    path:string,
    value: any
  }]
}

export class ConfigLoader {
  private configDir:string
  private environment:string
  private validator:Ajv.ValidateFunction
  private config:object

  constructor (configDir:string, options:loaderOptions) {
    this.configDir = configDir
    this.environment = options.environment

    if (options.jsonSchema) {
      this.validator = new Ajv().compile(options.jsonSchema)
      const defaultIsValid = this.validator(options.defaultConfig)

      if (!defaultIsValid) throw new Error('Invalid default config')

      this.config = options.defaultConfig
    }

    this.createConfig(options.setProps)
  }

  private createConfig (setProps:{path:string, value: any}[] = []) {
    this.loadConfig()

    setProps.forEach((prop) => {
      let propRef = this.config
      return prop.path.split('.').forEach((elm, i, arr) => {
        propRef = propRef[elm]
        if (i === arr.length - 2) {
          propRef[arr.pop()] = prop.value
        }
      })
    })
  }

  public getConfig () {
    return this.config
  }

  public getSpecificConfig (path:string) {
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
