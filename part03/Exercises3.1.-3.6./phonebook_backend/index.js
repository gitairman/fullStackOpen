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

const getId = () => {
    let range = 50
    let id = Math.floor(Math.random() * range)
    while (persons.some(person => person.id === id)) {
        range += 10
        id = Math.floor(Math.random() * range)
    }
    return id
}

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
        res.status(404).send(`Person with id ${id} not found`)
    }
})

app.post('/api/persons', (req, res) => {
    const personToAdd = req.body
    if (personToAdd.name && personToAdd.number) {
        persons = [...persons, {...personToAdd, id: getId()}]
        res.status(201).send(`${personToAdd} was successfully added`)
    } else {
        res.status(400).send('New entry NOT added, information missing')
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
