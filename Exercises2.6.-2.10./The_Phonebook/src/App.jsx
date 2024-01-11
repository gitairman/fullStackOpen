import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
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
      let personId = ''
      let updatedPersonArray = [...persons]
      for (let person of persons) {
        if (person.name === newName) {
          personIdx = persons.indexOf(person)
          personId = person.id
          updatedPerson.id = personId
          updatedPersonArray[personIdx].number = newNumber
          break;
        }
      }
      personsService
        .update(personId, updatedPerson)
        .then(() => {
          setPersons(updatedPersonArray)
          setNewName('')
          setNewNumber('')
        })
        .then(() => displayMessage(`INFO - Number for ${newName} was successfully UPDATED`))
        .catch(error => displayMessage(error.message))
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

  const handleDelete = (e) => {
    const personName = e.target.getAttribute("data-name")
    if (window.confirm(`Are you sure you want to delete ${personName}`)) {
      const personId = e.target.getAttribute("data-id")
      personsService.deletePerson(personId)
        .then(returnedPerson => setPersons([...persons.filter(person => person.id !== returnedPerson.id)]))
        .then(() => displayMessage(`INFO - ${personName} was successfully DELETED`))
        .catch(error => displayMessage(error.message))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm elements={[addPerson, handleNameChange, handleNumberChange, newName, newNumber]} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete} />
    </div>
  )
}

export default App