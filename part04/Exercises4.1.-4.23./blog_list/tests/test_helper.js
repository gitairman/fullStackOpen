const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const emptyList = []

const listWithOneBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }
]

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

const initialUsers = [
    {
        username: 'root',
        name: 'initialuser',
        password: 'password1'
    },
    {
        username: 'airman',
        name: 'Aaron Hopkins',
        password: 'password2'
    },
    {
        username: 'sophielou',
        name: 'Sophie Louise',
        password: 'password2'
    }
]

const tokens = []

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'fake title',
        author: 'fake author',
        url: 'fake url'
    })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find()
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find()
    return users.map(user => user.toJSON())
}

const loadUsers = async () => {

    initialUsers.forEach(async (user) => {
        await api
            .post('/api/users')
            .send(user)
    })

    let usrsInDb = []
    while (usrsInDb.length < initialUsers.length) {
        usrsInDb = await usersInDb()
    }

    return 'users loaded into Db'

}

const loginUsers = async () => {

    initialUsers.forEach(async (user) => {

        const result = await api
            .post('/api/login')
            .send(user)

        tokens.push(result.body.token)
    })

    while (tokens.length !== initialUsers.length) {
        await usersInDb()
    }

    return 'users logged in'

}

const loadBlogs = async () => {

    initialBlogs.forEach(async (blog) => {
        await api
            .post('/api/blogs')
            .auth(tokens[0], { type: "bearer" })
            .send(blog)

    })

    let blgsInDb = []
    while (blgsInDb.length < initialBlogs.length) {
        blgsInDb = await blogsInDb()
    }

    return 'finished loading blogs'

}

module.exports = {
    initialBlogs,
    initialUsers,
    tokens,
    nonExistingId,
    blogsInDb,
    usersInDb,
    loadUsers,
    loginUsers,
    loadBlogs
}