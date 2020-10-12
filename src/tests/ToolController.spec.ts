import { Application } from 'express'
import request from 'supertest'
import { createConnection, getConnection } from 'typeorm'
import { Tool } from '../main/entities/Tool'
import { initializeDatabase } from './assets/initializeDatabase'

var app: Application

beforeAll(async () => {
  await createConnection({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: ['src/main/entities/*.ts'],
    synchronize: true,
    logging: false
  })

  app = require('../main/app')
})

beforeEach(async () => {
  await getConnection().synchronize(true)

  return await initializeDatabase()
})

afterAll(async (done) => {
  await getConnection().close()
  done()
})

describe('Route test /tools - Tools operations', () => {
  it('POST /tools - Register tool with new tags', async (done) => {
    const tool = {
      title: 'Test Tool',
      link: 'testtool.com',
      description: 'Testing tool registration',
      tags: ['test', 'tool', 'tags', 'default', 'new']
    }

    const { body } = await request(app)
      .post('/tools')
      .send(tool)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(body.title).toEqual('Test Tool')
    done()
  })

  it('POST /tools - Register tool with existing tags', async (done) => {
    const tool = {
      title: 'Test Tool',
      link: 'testtool.com',
      description: 'Testing tool registration',
      tags: ['test', 'default']
    }

    const { body } = await request(app)
      .post('/tools')
      .send(tool)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(body.title).toEqual('Test Tool')
    done()
  })

  it('GET /tools - Get all tools', async (done) => {
    const { body }: { body: Array<Tool> } = await request(app)
      .get('/tools')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.length).toBe(4)
    expect(body[0].tags).toBeTruthy()
    done()
  })

  it('GET /tools - Get tools with tag', async (done) => {
    const { body }: { body: Array<Tool> } = await request(app)
      .get('/tools')
      .query({ tag: 'test' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.length).toBe(2)
    expect(body[0].tags).toBeTruthy()
    done()
  })

  it('GET /tools/:id - Get tool by id', async (done) => {
    const { body }: { body: Tool } = await request(app)
      .get('/tools/1')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body).toBeTruthy()
    expect(body.tags).toBeTruthy()
    done()
  })

  it('DELETE /tools/:id - Remove tool with id', async (done) => {
    request(app)
      .delete('/tools/1')
      .expect(204, done)
  })
})
