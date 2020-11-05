import { createConnection, getConnection } from 'typeorm'
import { initializeDatabase } from './initializeDatabase'
import { sign as jwtSing } from 'jsonwebtoken'
import { jwtSecret } from '@config/app'
import { Application } from 'express'
import { dbConfig } from '@config/database'

export function beforeAll (callback:(app:{app: Application, token:string}) => void,
  token:boolean = false, userId:number = 1) {
  return async (done:jest.DoneCallback) => {
    await createConnection(dbConfig('test'))
    await initializeDatabase()

    const callBackData = {
      app: (await import('../../app/app')).app,
      token: token ? jwtSing({ userId: userId }, jwtSecret, { expiresIn: '1h' }) : null
    }
    callback(callBackData)
    done()
  }
}

export async function beforeEach (done:jest.DoneCallback) {
  await getConnection().synchronize(true)
  await initializeDatabase()
  done()
}

export async function afterAll (done:jest.DoneCallback) {
  await getConnection().close()
  done()
}
