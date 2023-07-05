const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

afterAll((done) => done())

describe('Testing The User Endpoints', () => {
  test('You can SUCESSFULLY create a new user!', async () => {
    const response = await request(app)
      .post('/user')
      .send({ 
      name: 'Beyonce Knowles', 
      email: 'beyonce@example.com', 
      password: 'password123' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('Beyonce Knowles')
    expect(response.body.user.email).toEqual('beyonce@example.com')
    expect(response.body).toHaveProperty('token')
  })

  test('You can SUCESSFULLY login a user!', async () => {
    const user = new User({ 
    name: 'Beyonce Knowles', 
    email: 'beyonce@gmail.com', 
    password: 'password123' })
    await user.save()

    const response = await request(app)
      .post('/user/login')
      .send({ 
      email: 'beyonce@gmail.com', 
      password: 'password123' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.user.name).toEqual('Beyonce Knowles')
    expect(response.body.user.email).toEqual('beyonce@gmail.com')
    expect(response.body).toHaveProperty('token')
  })

  test('You can SUCESSFULLY update a user!', async () => {
    const user = new User({ 
    name: 'Rihanna Fenty', 
    email: 'rih@example.com', 
    password: 'password123' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .put(`/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        name: 'Rihanna Fenty', 
        email: 'rih@example.com' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual('Rihanna Fenty')
    expect(response.body.email).toEqual('rih@example.com')
  })

  test('You can SUCESSFULLY delete a user!', async () => {
    const user = new User({ 
      name: 'Beyonce Knowles', 
      email: 'beyonce@yahoo.com', 
      password: 'password123' })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
      .delete(`/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('User Deleted Successfully')
  })
})