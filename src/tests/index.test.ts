import request from 'supertest'
import app from '../app'

it('should return status 200', async () => {
  const response = await request(app).get('/')
  expect(response.status).toBe(200)
  expect(response.body.message).toBe('Hello World!')
})
