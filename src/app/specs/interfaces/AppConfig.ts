import { ConnectionOptions } from 'typeorm'

export interface AppConfig {
    port: number | string,
    jwtSecret: string,
    connection: ConnectionOptions
}
