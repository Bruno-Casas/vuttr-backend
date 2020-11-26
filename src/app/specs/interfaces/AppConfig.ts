import { ConnectionOptions } from 'typeorm'

export interface AppConfig {
    jwtSecret: string,
    database: ConnectionOptions
}
