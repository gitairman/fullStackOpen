const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = null
      let booksToFind = {}
      if ('author' in args && !('genre' in args)) {
        const [authorFound] = await Author.find({
          $text: { $search: args.author },
        })
        if (authorFound) {
          booksToFind['author'] = authorFound._id
          books = await Book.find(booksToFind)
        }
      } else if ('author' in args && 'genre' in args) {
        const [authorFound] = await Author.find({
          $text: { $search: args.author },
        })
        if (authorFound) {
          booksToFind['author'] = authorFound._id
          books = await Book.find(booksToFind)
          books = books.filter((book) =>
            book.genres[0].split(',').includes(args.genre)
          )
        }
      } else if ('genre' in args) {
        books = await Book.find({
          $text: { $search: args.genre },
        })
      } else {
        books = await Book.find()
      }
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find()
      if (!authors) {
        return authors
      }
      let newAuthors = []
      authors.forEach((a) =>
        newAuthors.push({
          id: a._id,
          name: a.name,
          born: a.born,
          books: a.books.length,
        })
      )
      return newAuthors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  // Author: {
  //   bookCount: async (root) => {
  //     const books = await Book.find({ author: root._id })
  //     return books.length
  //   },
  // },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      let bookAuthor = await Author.findOne({ name: args.author })
      if (!bookAuthor) {
        bookAuthor = new Author({ name: args.author })
      }
      const genres = args.genres
      delete args.genres

      const newBook = new Book({ ...args, author: bookAuthor._id })
      bookAuthor.books = [...bookAuthor.books, newBook._id]
      genres.forEach((genre, idx) => (newBook.genres[idx] = genre))
      try {
        await bookAuthor.save()
        await newBook.save()
      } catch (err) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            err,
          },
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook.populate('author')
    },
    editBorn: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const authorFound = await Author.findOne({ name: args.name })
      if (authorFound === null) return null
      try {
        const updatedAuthor = await Author.findByIdAndUpdate(
          authorFound._id,
          { born: args.setBornTo },
          { new: true }
        )
        return updatedAuthor
      } catch (err) {
        throw new GraphQLError('Saving born failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            err,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return await user.save().catch((err) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            err,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
