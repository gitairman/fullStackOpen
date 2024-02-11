import { useState } from 'react'
import personsService from '../services/personsService'
import { tableStyle } from '../styles/styles'

const Person = ({ person, handleDelete }) => {
  const [name, setName] = useState(person.name)
  const [number, setNumber] = useState(person.number)
  const [email, setEmail] = useState(person.email)
  const [editing, setEditing] = useState(false)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    const updatedPerson = {
      name: name,
      number: number.toString(),
      email: email,
    }

    personsService
      .update(person.id, updatedPerson)
      .then((returnedPerson) => {
        if (!returnedPerson) {
          alert('Person has already been removed from the phonebook!')
        } else {
          alert('Person was successfully UPDATED')
        }
      })
      .catch((error) => {
        alert(error.response.data)
        setName(person.name)
        setNumber(person.number)
        setEmail(person.email)
      })

    setEditing(false)
  }

  const edit = () => (
    <tr>
      <td>
        <input
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={number}
          onChange={({ target }) => setNumber(target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </td>
      <td>
        {' '}
        <button onClick={() => handleSave()}>save</button>
      </td>
      <td>
        <button onClick={() => setEditing(false)}>cancel</button>
      </td>
    </tr>
  )

  const display = () => (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>{email}</td>
      <td>
        {' '}
        <button onClick={() => handleEdit()}>edit</button>
      </td>
      <td>
        <button onClick={handleDelete}>delete</button>
      </td>
    </tr>
  )

  return editing ? edit() : display()
}

export default Person

// <tr>
//   <td>{person.name}</td>
//   <td>{person.number}</td>
//   <td>{person.email}</td>
//   <td>
//     {' '}
//     <button onClick={() => console.log('open edit form')}>edit</button>
//   </td>
//   <td>
//     <button onClick={handleDelete}>delete</button>
//   </td>
// </tr>
