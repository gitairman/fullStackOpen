const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const personFound = persons.find(person => person.id === id)
    if(personFound) {
        res.send(personFound)
    } else {
        res.status(404).send('Person not found')
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const personFound = persons.find(person => person.id === id)
    if (personFound) {
        persons = persons.filter(person => person.id !== id)
        res.status(204).send(`${personFound.name} was successfully deleted`)
    } else {
        res.status(404).send(`Person with id ${id} cannot be found`)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
