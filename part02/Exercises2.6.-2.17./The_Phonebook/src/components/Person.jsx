import { tableStyle } from '../styles/styles'

const Person = ({ person, handleDelete }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>{person.email}</td>
      <td>
        {' '}
        <button onClick={() => console.log('open edit form')}>edit</button>
      </td>
      <td>
        <button onClick={handleDelete}>delete</button>
      </td>
    </tr>
  )
}

export default Person
