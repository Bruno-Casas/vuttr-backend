import { getConnection } from 'typeorm'
import { initializeDatabase } from './initializeDatabase'
import { Application } from 'express'
import initApp from '@app'
import { generateTestToken } from './integrationTestUtils'

export function beforeAll (callback:(app:{app: Application, token:string}) => void,
  token:boolean = false, userId:number = 1) {
  return async (done:jest.DoneCallback) => {
    const callBackData: { app: Application; token: string; } = {
      app: await initApp(),
      token: token ? generateTestToken(userId) : null
    }

    await initializeDatabase()
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
