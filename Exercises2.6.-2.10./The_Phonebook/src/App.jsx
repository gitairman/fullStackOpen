import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      setPersons([...persons, { name: newName, number: newNumber.toString() }])
      setNewName('')
      setNewNumber('')
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
      Filter by name: <input onChange={handleFilterChange}/>
      <form onSubmit={addPerson}>
        <h2>Add a new person</h2>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newFilter ? 
      persons.filter(person => person.name.includes(newFilter)).map(person => <p key={person.name}>{person.name}: {person.number}</p>) :
      persons.map(person => <p key={person.name}>{person.name}: {person.number}</p>)
      }
    </div>
  )
}

export default App