import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const baseUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    personsService
      .getAll()
      .then(people => setPersons(people))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    let addPerson = true
    let updatePerson = false
    let personIdx = 0

    if (newName === '' || newNumber === '') {
      alert('Both fields must contain a value!')
      addPerson = false
    } else if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already in the phonebook, replace the phone number?`)) {
        updatePerson = true
        addPerson = false
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already in use by someone else!`)
      setNewNumber('')
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
        .then(returnedPerson => {
          setPersons(updatedPersonArray)
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

  const handleDelete = (e) => {
    const personName = e.target.getAttribute("data-name")
    if (window.confirm(`Are you sure you want to delete ${personName}`)) {
      const personId = e.target.getAttribute("data-id")
      personsService.deletePerson(personId)
        .then(returnedPerson => setPersons([...persons.filter(person => person.id !== returnedPerson.id)]))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm elements={[addPerson, handleNameChange, handleNumberChange, newName, newNumber]} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete} />
    </div>
  )
}

export default App