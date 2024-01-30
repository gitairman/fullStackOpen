import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER, FILTERED_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Books = ({ show, token }) => {
  const [filter, setFilter] = useState('')
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER)
  const [userGenre, setUserGenre] = useState('')

  const [getByGenre, filteredResult] = useLazyQuery(FILTERED_BOOKS)

  useEffect(() => {
    if (filter !== '' && !show){
      setFilter('')
    }
    const refetchForChanges = async () => {
      await getByGenre({ variables: { genre: '' } })
      await booksResult.refetch()
    }
    refetchForChanges()
  }, [show])

  useEffect(() => {
    const refetchUserGenre = async () => {
      await userResult.refetch()
    }
    if (token) {
      refetchUserGenre()
      console.log('user has been refetched')
    }
    if (!token) {
      setUserGenre('')
      console.log('user genre reset')
    }
    setFilter('')
  }, [token])

  if (!show) {
    return null
  }

  if (booksResult.loading) {
    return <div>loading...</div>
  }

  if (filteredResult.loading) {
    return <div>loading...</div>
  }

  if (userResult.loading) {
    return <div>loading...</div>
  }
  
  const books = booksResult.data.allBooks
  //find all the unique genres to filter by
  const genres = [
    ...new Set(
      books
        .map((b) => b.genres[0])
        .join()
        .split(',')
        .map((g) => g.trim())
    ),
  ].sort()

  const filteredBooks = filteredResult.data.allBooks

  if (
    userResult.data.me !== null &&
    userGenre !== userResult.data.me.favoriteGenre
  ) {
    setUserGenre(userResult.data.me.favoriteGenre)
  }

  const handleFilterClick = async ({ target }) => {
    if (target.textContent === 'ALL') {
      setFilter('')
    } else {
          await getByGenre({ variables: { genre: target.textContent } })
    setFilter(target.textContent)
    }
  }

  const handleRecommendedClick = async () => {
    await getByGenre({ variables: { genre: userGenre } })
    setFilter(userGenre)
  }

  const recommend = () => (
    <div style={{ display: !token ? 'none' : '' }}>
      <button style={{ marginRight: 10 }} onClick={handleRecommendedClick}>
        Recommended
      </button>
      Based on your favourite genre '<strong>{userGenre}</strong>'<br />
    </div>
  )

  const showAllBooks = () => {
    return books.map((a) => (
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    ))
  }

  const showFiltered = () => {
    return filteredBooks.map((a) => (
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    ))
  }

  return (
    <div>
      <h2>books</h2>
      {token && !userResult.loading ? recommend() : null}
      <button onClick={handleFilterClick}>ALL</button>
      {genres.map(
        (g) =>
          g !== '' && (
            <button key={g} onClick={handleFilterClick}>
              {g}
            </button>
          )
      )}
      <table style={{ marginTop: 10 }}>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter === '' ? showAllBooks() : showFiltered()}
        </tbody>
      </table>
    </div>
  )
}

export default Books
