const mongoose = require('mongoose')
const dbHandler = require('../utils/database')
const User = require('../../src/app/models/User')
let app
const request = require('supertest')
const { generateUser } = require('../utils/user')

describe('Plant  ', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    await dbHandler.connect()
    app = require('../../src/app')
  })

  it('Create Plant', async () => { })
  it('get Plant', async () => { })
  it('get Plants', async () => { })
  it('Update Plant', async () => { })
  it('Delete Plant', async () => { })

  afterAll(async () => {
    await dbHandler.closeDatabase()
  })
})
