import { Application } from 'express'
import request from 'supertest'
import { Tool } from '@entities'
import * as lifeCycle from './assets/testLifeCycleFunctions'
import { ToolsPage } from '@specs/interfaces'

var app: Application
var authToken: string

beforeAll(lifeCycle.beforeAll(data => {
  app = data.app
  authToken = data.token
}, true))
beforeEach(lifeCycle.beforeEach)
afterAll(lifeCycle.afterAll)

describe('Route test /tools - Tools operations', () => {
  it('POST /tools - Register tool with existing tags', async (done) => {
    const tool = {
      title: 'Test Tool',
      link: 'test-tool.com',
      description: 'Testing tool registration',
      tags: ['test', 'default']
    }

    const { body } = await request(app)
      .post('/tools')
      .send(tool)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(body.title).toEqual('Test Tool')
    done()
  })

  it('POST /tools - Register tool with new tags', async (done) => {
    const tool = {
      title: 'Test Tool',
      link: 'test-tool.com',
      description: 'Testing tool registration',
      tags: ['test', 'tool', 'tags', 'default', 'new']
    }

    const { body } = await request(app)
      .post('/tools')
      .send(tool)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(body.title).toEqual('Test Tool')
    done()
  })

  it('POST /tools - Untagged tool registration', async (done) => {
    const tool = {
      title: 'Test Tool',
      link: 'test-tool.com',
      description: 'Testing tool registration',
      tags: []
    }

    const { body } = await request(app)
      .post('/tools')
      .send(tool)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(406)

    expect(body.success).toBe(false)
    done()
  })

  it('POST /tools - Tool record missing attribute', async (done) => {
    const tool = {
      title: 'Test Tool',
      description: 'Testing tool registration',
      tags: ['test', 'tool', 'tags', 'default', 'new']
    }

    const { body } = await request(app)
      .post('/tools')
      .send(tool)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(body.success).toBe(false)
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

  it('GET /tools - Get paginated tools', async (done) => {
    const { body }: { body: ToolsPage} = await request(app)
      .get('/tools')
      .query({ page: 1, size: 2 })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.tools.length).toBe(2)
    expect(body.page).toBe(1)
    expect(body.tools[0].id).toBe(1)
    done()
  })

  it('GET /tools - Get the first page only with the size parameter', async (done) => {
    const { body }: { body: ToolsPage} = await request(app)
      .get('/tools')
      .query({ size: 2 })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.tools.length).toBe(2)
    expect(body.page).toBe(1)
    expect(body.tools[0].id).toBe(1)
    done()
  })

  it('GET /tools - Get page with default size', async (done) => {
    const { body }: { body: ToolsPage} = await request(app)
      .get('/tools')
      .query({ page: 1 })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.tools.length).toBe(4)
    expect(body.page).toBe(1)
    expect(body.size).toBe(10)
    expect(body.tools[0].id).toBe(1)
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

  it('GET /tools/:id - Get nonexistent tool by id', async (done) => {
    request(app)
      .get('/tools/100')
      .expect(404, done)
  })

  it('DELETE /tools/:id - Remove tool with id', async (done) => {
    request(app)
      .delete('/tools/1')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204, done)
  })
})
