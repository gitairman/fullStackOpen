import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personsService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(people => setPersons(people))
      .catch(error => displayMessage(error.message))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    let addPerson = true
    let updatePerson = false
    let personIdx = 0

    if (newName === '' || newNumber === '') {
      displayMessage('Both fields must contain a value!  Please try again.')
      addPerson = false
    } else if (persons.some(person => person.number === newNumber)) {
      displayMessage(`${newNumber} is already in use by someone else! Please try again.`)
      setNewNumber('')
      addPerson = false
    } else if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook, replace the phone number?`)) {
        updatePerson = true
        addPerson = false
      } else {
        addPerson = false
        setNewName('')
        setNewNumber('')
      }
    }

    if (addPerson) {
      const newPerson = { name: newName, number: newNumber.toString() }
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setNewNumber('')
        })
        .then(() => displayMessage(`INFO - ${newName} was successfully ADDED`))
        .catch(error => displayMessage(error.message))
    } else if (updatePerson) {
      const updatedPerson = { name: newName, number: newNumber.toString() }
      let updatedPersonArray = [...persons]
      let found = persons.find(({ name }) => name === newName)
      let personId = found.id

      personIdx = persons.indexOf(found)
      updatedPerson.id = personId
      updatedPersonArray[personIdx].number = newNumber

      personsService
        .update(personId, updatedPerson)
        .then(() => {
          setPersons(updatedPersonArray)
          setNewName('')
          setNewNumber('')
        })
        .then(() => displayMessage(`INFO - Number for ${newName} was successfully UPDATED`))
        .catch(error => displayMessage(`Entry for ${newName} has already been removed from the server.`))
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const displayMessage = (messageToDisplay) => {
    setMessage(messageToDisplay)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleDelete = (personToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}`)) {
      personsService.deletePerson(personToDelete.id)
        .then(() => {
          setPersons([...persons.filter(person => person.id !== personToDelete.id)])
        })
        .then(() => displayMessage(`INFO - ${personToDelete.name} was successfully DELETED`))
        .catch(error => displayMessage(error.message))
    }
  }

  const peopleToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm elements={[addPerson, handleNameChange, handleNumberChange, newName, newNumber]} />
      <h3>Numbers</h3>
      <ul style={{paddingLeft: 0}} >
        {peopleToShow.map(person =>
          <Person key={person.id} person={person} handleDelete={() => handleDelete(person)} />)}
      </ul>
    </div>
  )
}

export default App