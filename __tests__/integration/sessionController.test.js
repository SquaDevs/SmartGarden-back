const mongoose = require('mongoose')
const dbHandler = require('../utils/database')
const User = require('../../src/app/models/User')
let app
const request = require('supertest')
const { generateUser } = require('../utils/user')

describe('Session  ', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    await dbHandler.connect()
    app = require('../../src/app')
  })

  it('Auth User ', async () => {
    const user = generateUser()
    await User.create(user)

    const response = await request(app)
      .post('/v1/auth')
      .send(user)

    const { body: { token, name, email, username }, status } = response
    const tokenObj = await User.checksToken(token)

    expect(status).toBe(200)
    expect(name).toEqual(user.name)
    expect(email).toEqual(user.email)
    expect(username).toEqual(user.username)
    expect(tokenObj).toHaveProperty('id')
  })

  it('User not found ', async () => {
    const user = generateUser()
    // await User.create(user)

    const response = await request(app)
      .post('/v1/auth')
      .send(user)

    const { body, status } = response

    expect(status).toBe(400)
    expect(body).toHaveProperty('error')
    expect(body.error).toEqual('User not found')
  })

  it('Password not found ', async () => {
    const user = generateUser()
    await User.create(user)

    const response = await request(app)
      .post('/v1/auth')
      .send({ ...user, password: generateUser().password })

    const { body, status } = response

    expect(status).toBe(400)
    expect(body).toHaveProperty('error')
    expect(body.error).toEqual('Invalid password')
  })

  afterAll(async () => {
    await dbHandler.closeDatabase()
  })
})
