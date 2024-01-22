require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI

const DBNAME = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
    ? process.env.TEST_DBNAME
    : process.env.DBNAME

const SECRET = process.env.SECRET

module.exports = {
    MONGODB_URI,
    PORT,
    DBNAME,
    SECRET
}