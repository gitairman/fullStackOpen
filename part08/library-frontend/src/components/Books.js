import { useQuery } from "@apollo/client"
import { ALL_BOOKS, CURRENT_USER } from "../queries"
import { useState } from "react"

const Books = ({show, token}) => {
  const [filter, setFilter] = useState('')
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER)
  const [userGenre, setUserGenre] = useState('')

  if (!show) {
    return null
  }

  if (booksResult.loading) {
    return <div>loading...</div>
  }

  if (userResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks
  const genres = [...new Set(books.map(b=>b.genres[0]).join().split(',').map(g=>g.trim()))].sort()

  if (userGenre === '') {
      setUserGenre(userResult.data.me.favoriteGenre)
  }

  const recommend = () => (
    <div style={{display: !token ? 'none' : ''}}>
    <button style={{marginRight: 10}} onClick={()=>setFilter(userGenre)}>Recommended</button>Based on your favourite genre '<strong>{userGenre}</strong>'<br />
    </div>
  )

  return (
    <div>
      <h2>books</h2>
      {token && !userResult.loading ? recommend() : null}
      {genres.map(g=> g !== '' && <button key={g} onClick={({target})=>setFilter(target.textContent)}>{g}</button>)}
      <table style={{marginTop: 10}}>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => a.genres.join().includes(filter) && (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
