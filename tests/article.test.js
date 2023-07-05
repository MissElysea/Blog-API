const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const server = app.listen(8081, () => console.log('Testing on PORT 8081'))
const User = require('../models/user')
const Article = require('../models/article')
const { token } = require('morgan')
let mongoServer;
let user;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
  user = new User ({
    name: "name",
    email: "email.com",
    password: "password",
  });
  await user.save()
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

afterAll((done) => done())

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