const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const User = require('../models/user')
const Article = require ('../models/article')

let mongoServer
let user
let server

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

// Start Server //
beforeAll(async () => {
server = app.listen(8080, () => { 
  console.log('Testing on Port 8080!')
})
})

// Create Test User //
beforeEach(async () => {
user = new User ({
  name: "name",
  email: "email.com",
  password: "password",
})
await user.save()
})

afterEach(async () => {
  await mongoose.connection.db.dropDatabase()
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

// USER TESTING //

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
    const token = await user.generateAuthToken()

    const response = await request(app)
      .delete(`/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('User Deleted Successfully')
  })
})

// ARTICLE TESTING //

describe('Testing The Article Endpoints', () => {
  test('You can SUCESSFULLY create a new article!', async () => {
    const token = await user.generateAuthToken();

    const response = await request(app)
      .post('/article')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
      title: 'Title', 
      description: 'Description',
      user: `/user/${user._id}`,
        });
    
    expect(response.statusCode).toBe(200)
    expect(response.body.article.title).toEqual('Title')
    expect(response.body.article.description).toEqual('Description')
    expect(response.body).toHaveProperty('token')
  })

  test('You can SUCESSFULLY find an article!', async () => {
    const article = new Article({ 
    title: 'Title', 
    description: 'Description', 
    user: user._id
     })
    await article.save()

    const token = await user.generateAuthToken();

    const response = await request(app)
      .get(`/article/${article._id}`)
      .set('Authorization', `Bearer ${token}`)
    
      expect(response.statusCode).toBe(200)
      expect(response.body.article.title).toEqual('Title')
      expect(response.body.article.description).toEqual('Description')
  })

  test('You can SUCESSFULLY update an article!', async () => {
    const token = await user.generateAuthToken();

    const article = new Article({ 
    title: 'Title', 
    description: 'Description', 
    user: user._id
    })
    await article.save()

    const response = await request(app)
      .put(`/article/${article._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Updated Article Title', 
        description: 'Updated Article Description' })
    
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toEqual('Updated Article Title')
    expect(response.body.description).toEqual('Updated Article Description')
  })

  test('You can SUCESSFULLY delete an article!', async () => {
    const token = await user.generateAuthToken()

    const article = new Article({ 
      title: 'Title', 
      description: 'Description', 
      user: user._id
     })
    await article.save()

    const response = await request(app)
      .delete(`/article/${article._id}`)
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('Article Deleted Successfully')
  })
})