import { gql } from "@apollo/client"


export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
editBorn(
    name: $name
    setBornTo: $born
  ) {
    name
    born
  }
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    title
    author {
        name
        born
        bookCount
    }
    published
    genres
    id
}
`

export const ALL_BOOKS = gql`
query getAll {
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const FILTERED_BOOKS = gql`
query findBooksByAuthorOrGenre($author: String, $genre: String){
  allBooks(author: $author, genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CURRENT_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`