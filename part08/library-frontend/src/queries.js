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

export const ALL_BOOKS = gql`
query getAll {
  allBooks {
    title
    author {
        name
        born
        bookCount
    }
    published
    genres
  }
}
`

export const FILTERED_BOOKS = gql`
query findBooksByAuthorOrGenre($author: String, $genre: String){
  allBooks(author: $author, genre: $genre) {
    title
    author {
        name
        born
        bookCount
    }
    published
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
        name
    }
    published
    genres
    id
  }
}
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