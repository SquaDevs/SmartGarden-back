const mongoose = require('mongoose')
const dbHandler = require('../utils/database')
const User = require('../../src/app/models/User')
let app
const request = require('supertest')
const { generateUser } = require('../utils/user')

describe('User  ', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    await dbHandler.connect()
    app = require('../../src/app')
  })

  describe('Create User', () => {
    it('Success Creating User', async () => {
      const user = generateUser()

      const response = await request(app)
        .post('/v1/user')
        .send(user)
      expect(response.status).toBe(201)
      expect(response.body).toEqual({})
    })
    it('User already exists', async () => {
      const userFaker = generateUser()
      const user = await User.create(userFaker)
      const response = await request(app)
        .post('/v1/user')
        .send(user)

      const { status, body } = response
      expect(status).toBe(409)
    })
  })

  describe('Update User ', () => {
    it('Update name w/ success', async () => {
      const userFaker = generateUser()
      const user = await User.create(userFaker)
      const token = await User.generateToken(user)
      const newName = generateUser().name
      const response = await request(app)
        .put('/v1/user')
        .set('Authorization', 'Bearer ' + token)
        .send({ name: newName })
      const { status, body } = response
      expect(status).toBe(200)
      expect(userFaker.name).not.toEqual(newName)
      expect(userFaker.name).not.toEqual(body.user.name)
      expect(newName).toEqual(body.user.name)
    })

    it('Update name without token', async () => {
      // const token = await User.generateToken(user)

      const newName = generateUser().name
      const response = await request(app)
        .put('/v1/user')

        .send({ name: newName })
      const { status, body } = response
      expect(status).toBe(401)
      expect(body).toHaveProperty('error')
      expect(body.error).toEqual('Token not provider')
    })
    // it('Update username', async () => {
    //     const userFaker = generateUser()
    //     const user = await User.create(userFaker)
    //     const token = await User.generateToken(user)

    //     const newUserName = generateUser().username
    //     const response = await request(app)
    //         .put('/v1/user')
    //         .set('Authorization', 'Bearer ' + token)
    //         .send({ email: newUserName })
    //     console.log(response.status)
    //     console.log(response.body)
    // })

    it('No data to be Update', async () => {
      const userFaker = generateUser()
      const user = await User.create(userFaker)
      const token = await User.generateToken(user)

      const response = await request(app)
        .put('/v1/user')
        .set('Authorization', 'Bearer ' + token)
        .send({})
      const { status, body } = response
      expect(status).toBe(406)
      expect(body).toHaveProperty('error')
      expect(body.error).toEqual('No data to be updated')
    })
  })

  it('Get User', async () => {
    const userFaker = generateUser()
    const user = await User.create(userFaker)
    const token = await User.generateToken(user)
    const response = await request(app)
      .get('/v1/user')
      .set('Authorization', 'Bearer ' + token)

    const { status, body } = response
    expect(status).toBe(200)

    expect(body).toHaveProperty('user')
    expect(body).toHaveProperty('user._id')
    expect(body).toHaveProperty('user.email')
    expect(body).toHaveProperty('user.name')
    expect(body).toHaveProperty('user.username')
    expect(body).toHaveProperty('user.createdAt')
  })

  it('Delete User', async () => {
    const userFaker = generateUser()
    const user = await User.create(userFaker)
    const token = await User.generateToken(user)
    const response = await request(app)
      .delete('/v1/user')
      .set('Authorization', 'Bearer ' + token)

    const { status, body } = response
    expect(status).toBe(200)
  })

  afterAll(async () => {
    await dbHandler.closeDatabase()
  })
})
