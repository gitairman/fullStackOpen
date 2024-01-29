import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, FILTERED_BOOKS } from '../queries'
import { useField } from './customHooks'

const NewBook = ({show }) => {
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const published = useField('number', 'published')
  const genre = useField('text', 'genre')
  const [genres, setGenres] = useState([])
  const [message, setMessage] = useState({type: true, message: ''})

  useEffect(() => {
    setMessage({type: true, message: ''})
  }, [show])

  const [createBook] = useMutation(CREATE_BOOK, {
    onCompleted: (result) => {console.log(result)},
    onError: (err) => {
      console.log(err.message)
      setMessage({type: false, message: err.message + ', please log in'})
    },
    // update: (cache, res) => {
    //   cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    //     console.log(res)
    //     return {
    //       allBooks: [...allBooks, res.data.addBook],
    //     }
    //   })
    // },
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }, { query: FILTERED_BOOKS, variables: {genre: genres.join(',')} } ],
    awaitRefetchQueries: true
  })

  if (!show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log(genres)
    createBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres,
      },
    })

    title.onReset()
    author.onReset()
    published.onReset()
    genre.onReset()
    setGenres([])
  }

  const addGenre = () => {
    console.log(genre.value)
    setGenres(genres.concat(genre.value))
    console.log(genres)
    genre.onReset()
  }

  return (
    <div>
      <form id="newBookForm" onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(', ')}</div>
        <button type="submit">create book</button>
        <p style={{display: message.message !== '' ? '': 'none', color: message.type ? 'green': 'red'}}>{message.message}</p>
      </form>
    </div>
  )
}

export default NewBook
