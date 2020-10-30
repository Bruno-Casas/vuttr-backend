import { Application } from 'express'
import request from 'supertest'
import * as cicle from './assets/testLifeCicleFunctions'

var app: Application

beforeAll(cicle.beforeAll(data => {
  app = data.app
}))
beforeEach(cicle.beforeEach)
afterAll(cicle.afterAll)

describe('Route test /auth - Authorization operations', () => {
  it('POST /auth - Authorization with username', async (done) => {
    const userLogin = {
      username: 'testUser1',
      password: 'Password@123'
    }

    const { body } = await request(app)
      .post('/auth')
      .send(userLogin)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.token).toBeTruthy()
    done()
  })

  it('POST /auth - Authorization with email', async (done) => {
    const userLogin = {
      email: 'user1@example.com',
      password: 'Password@123'
    }

    const { body } = await request(app)
      .post('/auth')
      .send(userLogin)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.token).not.toBeNull()
    done()
  })
})
