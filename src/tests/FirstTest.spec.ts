import request from "supertest";
import app from '../main/app'

test("Hello test", done => {
  request(app)
    .get("/")
    .expect('Content-Type', /json/)
    .expect(200, done)

});
