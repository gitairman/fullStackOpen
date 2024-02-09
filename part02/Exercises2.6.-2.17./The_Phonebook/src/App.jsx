import { useState, useEffect, memo } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/personsService'
import ContactList from './components/ContactList'
import Header from './components/Header'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'

const App = memo(() => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filterType, setFilterType] = useState('name')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user !== null) {
      personsService
        .getAll()
        .then((people) =>
          setPersons(people.filter((p) => p.addedBy === user.sub))
        )
        .catch((error) =>
          displayMessage({ type: 'error', message: error.message })
        )
    } else setPersons([])
  }, [user])

  const addPerson = (e) => {
    e.preventDefault()

    let addNewPerson = true
    let updatePerson = false
    let personIdx = 0

    if (newName === '' || newNumber === '' || newEmail === '') {
      displayMessage({
        type: 'error',
        message: 'All fields must contain a value!  Please try again.',
      })
      addNewPerson = false
    } else if (persons.some((person) => person.number === newNumber)) {
      displayMessage({
        type: 'error',
        message: `${newNumber} is already in use by someone else! Please try again.`,
      })
      setNewNumber('')
      addNewPerson = false
    } else if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the phone number?`
        )
      ) {
        updatePerson = true
        addNewPerson = false
      } else {
        addNewPerson = false
        setNewName('')
        setNewNumber('')
        setNewEmail('')
      }
    }

    if (addNewPerson) {
      const newPerson = {
        name: newName,
        number: newNumber.toString(),
        email: newEmail,
        addedBy: user.sub,
      }
      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson])
          setNewName('')
          setNewNumber('')
        })
        .then(() =>
          displayMessage({
            type: 'info',
            message: `${newName} was successfully ADDED`,
          })
        )
        .catch((error) =>
          displayMessage({ type: 'error', message: error.response.data })
        )
    } else if (updatePerson) {
      const updatedPerson = { name: newName, number: newNumber.toString() }
      let found = persons.find(({ name }) => name === newName)
      let personId = found.id

      personIdx = persons.indexOf(found)
      updatedPerson.id = personId
      let updatedPersonsArray = [...persons]

      personsService
        .update(personId, updatedPerson)
        .then((returnedPerson) => {
          if (!returnedPerson) {
            displayMessage({
              type: 'error',
              message: `${updatedPerson.name} has already been removed from phonebook!`,
            })
            updatedPersonsArray = updatedPersonsArray.filter(
              (person) => person.id !== personId
            )
          } else {
            updatedPersonsArray[personIdx].number = returnedPerson.number
            displayMessage({
              type: 'info',
              message: `Number for ${newName} was successfully UPDATED`,
            })
          }
          setPersons(updatedPersonsArray)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          displayMessage({ type: 'error', message: error.response.data })
        })
    }
  }

  const handleNameChange = ({ target }) => {
    setNewName(target.value)
  }

  const handleNumberChange = ({ target }) => {
    setNewNumber(target.value)
  }

  const handleEmailChange = ({ target }) => {
    setNewEmail(target.value)
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
    if (
      window.confirm(`Are you sure you want to delete ${personToDelete.name}`)
    ) {
      personsService
        .deletePerson(personToDelete.id)
        .then((result) => {
          setPersons([
            ...persons.filter((person) => person.id !== personToDelete.id),
          ])
          if (!result) {
            displayMessage({
              type: 'error',
              message: `${personToDelete.name} has already been removed from phonebook!`,
            })
          } else {
            displayMessage({
              type: 'info',
              message: `${personToDelete.name} was successfully DELETED`,
            })
          }
        })
        .catch((error) =>
          displayMessage({ type: 'error', message: error.response.data })
        )
    }
  }

  const peopleToShow =
    newFilter === ''
      ? persons
      : persons.filter((person) =>
          person[filterType].toLowerCase().includes(newFilter.toLowerCase())
        )

  const loggedInViews = () => (
    <>
      <Filter
        handleFilterChange={handleFilterChange}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <PersonForm
        elements={[
          addPerson,
          handleNameChange,
          handleNumberChange,
          handleEmailChange,
          newName,
          newNumber,
          newEmail,
        ]}
      />
      <ContactList peopleToShow={peopleToShow} handleDelete={handleDelete} />
    </>
  )

  return (
    <>
      <Header />
      <Navigation />
      <Notification message={message} />
      <LoginForm setUser={setUser} />
      {user !== null && loggedInViews()}
    </>
  )
})

App.displayName = 'App'

export default App
