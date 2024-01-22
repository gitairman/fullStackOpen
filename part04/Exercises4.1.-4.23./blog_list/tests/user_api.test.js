const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    const passwordHash = await bcrypt.hash('sekret', 10)
    await User.deleteMany()
    helper.initialUsers.forEach(user => {
        user.passwordHash = passwordHash
    })
    await User.insertMany(helper.initialUsers)
})

describe('when there is initially one user in db', () => {


    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'samwise',
            name: 'Samwise Gamgee',
            password: 'hobbitshire',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('user without a name is not added and statuscode 400 is returned', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: '',
            name: 'frodo',
            password: 'sauron'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})