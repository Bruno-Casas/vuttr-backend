import { Application } from 'express'
import request from 'supertest'
import { generateTestToken } from './assets/integrationTestUtils'
import * as lifeCycle from './assets/testLifeCycleFunctions'

var app: Application
var authToken: string

beforeAll(lifeCycle.beforeAll(data => {
  app = data.app
  authToken = data.token
}, true))
beforeEach(lifeCycle.beforeEach)
afterAll(lifeCycle.afterAll)

describe('Route test /user - User operations', () => {
  it('POST /user - Register user', async (done) => {
    const user = {
      username: 'testUser',
      email: 'user@example.com',
      password: 'Password@123'
    }

    const { body } = await request(app)
      .post('/user')
      .send(user)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(body.username).toEqual('testUser')
    done()
  })

  it('POST /user - Register already disabled user', async (done) => {
    const user = {
      username: 'testUser2',
      email: 'user2@example.com',
      password: 'Password@123'
    }

    const { body } = await request(app)
      .post('/user')
      .send(user)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(body.username).toEqual('testUser2')
    done()
  })

  it('POST /user - Register existing user', async (done) => {
    const user = {
      username: 'testUser1',
      email: 'testUser@example.com',
      password: 'Password@123'
    }

    const { body } = await request(app)
      .post('/user')
      .send(user)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)

    expect(body.success).toBe(false)
    done()
  })

  it('POST /user - Register user with invalid username', async (done) => {
    const user = {
      username: 'test User',
      email: 'testUser@example.com',
      password: 'Password@123'
    }

    const { body } = await request(app)
      .post('/user')
      .send(user)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    expect(body.success).toBe(false)
    done()
  })

  it('POST /user - Register user with invalid email', async (done) => {
    const user = {
      username: 'test User',
      email: 'testUser-example.com',
      password: 'Password@123'
    }

    const { body } = await request(app)
      .post('/user')
      .send(user)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    expect(body.success).toBe(false)
    done()
  })

  it('GET /user - Get user', async (done) => {
    const { body } = await request(app)
      .get('/user')
      .set('authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body).toBeTruthy()
    expect(body.username).toBe('testUser1')
    done()
  })

  it('GET /user - Get non-existent user', async (done) => {
    const authToken = generateTestToken(-1)

    request(app)
      .get('/user')
      .set('authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(404, done)
  })

  it('DELETE /user - Delete/Disable user with tools', async (done) => {
    request(app)
      .delete('/user')
      .send({ password: 'Password@123' })
      .set('authorization', `Bearer ${authToken}`)
      .expect(204, done)
  })

  it('DELETE /user - Delete/Disable user without tools', async (done) => {
    const authToken = generateTestToken(3)

    request(app)
      .delete('/user')
      .send({ password: 'Password@123' })
      .set('authorization', `Bearer ${authToken}`)
      .expect(204, done)
  })

  it('DELETE /user - Delete/Disable non-existent user', async (done) => {
    const authToken = generateTestToken(-1)

    request(app)
      .delete('/user')
      .send({ password: 'Password@123' })
      .set('authorization', `Bearer ${authToken}`)
      .expect(404, done)
  })

  it('PATCH /user/{Id} - Register user with invalid email', async (done) => {
    const user = {
      username: 'Ignored',
      email: 'updated@example.com',
      password: 'Updated@123'
    }

    await request(app)
      .put('/user')
      .send(user)
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${authToken}`)
      .expect(204)

    const { body } = await request(app)
      .get('/user')
      .set('authorization', `Bearer ${authToken}`)

    expect(body.email).toBe('updated@example.com')
    done()
  })
})
