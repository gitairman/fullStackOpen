import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const baseUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    if (newName === '' || newNumber === '') {
      alert('Both fields must contain a value!')
    } else if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook!`)
      setNewName('')
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already in use by someone else!`)
      setNewNumber('')
    } else {
      const newPerson = { name: newName, number: newNumber.toString() }
      axios.post(baseUrl, newPerson)
        .then(res => res.data)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setNewNumber('')
        })
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm elements={[addPerson, handleNameChange, handleNumberChange, newName, newNumber]} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App