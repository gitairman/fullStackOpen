import { useState } from 'react'
import personsService from '../services/personsService'
import { tableStyle } from '../styles/styles'
import { useDispatch } from 'react-redux'
import { editContact, remove } from '../features/contacts/contactsSlice'

const Person = ({ contact }) => {
  const [name, setName] = useState(contact.name)
  const [number, setNumber] = useState(contact.number)
  const [email, setEmail] = useState(contact.email)
  const [editing, setEditing] = useState(false)

  const dispatch = useDispatch()

  const handleEdit = () => {
    setEditing(true)
  }

  const handleSave = () => {
    const updatedPerson = {
      name: name,
      number: number.toString(),
      email: email,
    }

    dispatch(editContact(contact.id, updatedPerson))

    // personsService
    //   .update(person.id, updatedPerson)
    //   .then((returnedPerson) => {
    //     if (!returnedPerson) {
    //       alert('Person has already been removed from the phonebook!')
    //     } else {
    //       alert('Person was successfully UPDATED')
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error.response.data)
    //     setName(person.name)
    //     setNumber(person.number)
    //     setEmail(person.email)
    //   })

    setEditing(false)
  }

  const handleDelete = (contactToDelete) => {
    if (
      window.confirm(`Are you sure you want to delete ${contactToDelete.name}`)
    ) {
      dispatch(remove(contactToDelete.id))

      // personsService
      //   .deletePerson(personToDelete.id)
      //   .then((result) => {
      //     setPersons([
      //       ...persons.filter((person) => person.id !== personToDelete.id),
      //     ])
      //     if (!result) {
      //       dispatch(
      //         setTempNotify(
      //           'error',
      //           `${personToDelete.name} has already been removed from phonebook!`
      //         )
      //       )
      //     } else {
      //       dispatch(
      //         setTempNotify(
      //           'info',
      //           `${personToDelete.name} was successfully DELETED`
      //         )
      //       )
      //     }
      //   })
      //   .catch((error) =>
      //     dispatch(setTempNotify('error', error.response.data))
      //   )
    }
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
