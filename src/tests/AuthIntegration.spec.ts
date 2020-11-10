import { Application } from 'express'
import request from 'supertest'
import * as lifeCycle from './assets/testLifeCycleFunctions'

var app: Application

beforeAll(lifeCycle.beforeAll(data => {
  app = data.app
}))
beforeEach(lifeCycle.beforeEach)
afterAll(lifeCycle.afterAll)

describe('Route test /auth - Auth operations', () => {
  it('POST /auth - Authentication with username', async (done) => {
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

  it('POST /auth - Authentication with email', async (done) => {
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

  it('POST /auth - Incorrect password authentication', async (done) => {
    const userLogin = {
      username: 'testUser1',
      email: 'user1@example.com',
      password: 'incorrect'
    }

    const { body } = await request(app)
      .post('/auth')
      .send(userLogin)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)

    expect(body.success).toBe(false)
    done()
  })

  it('GET /user - Authorization with invalid token', async (done) => {
    request(app)
      .get('/user')
      .set('Content-Type', 'application/json')
      .set('authorization', 'Bearer INVALID_TOKEN')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })
})
