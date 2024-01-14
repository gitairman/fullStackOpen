const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
let createPerson = true
let newPerson

if (process.argv.length <= 3) {
    createPerson = false
} else {
    newPerson = {
        "name": process.argv[3],
        "number": String(process.argv[4]),
    }
}

const url =
    `mongodb+srv://aaronhopkins86:${password}@cluster0.30c1sly.mongodb.net/?retryWrites=true&w=majority`

const main = async () => {

    mongoose.set('strictQuery', false)
    await mongoose.connect(url, { dbName: 'phonebook' })

    const personSchema = new mongoose.Schema({
        id: Number,
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (createPerson) {
        let person = new Person(newPerson)
        await person.save().then(() => {
            console.log('person saved!')
        })
    } else {
        console.log("phonebook:")
        await Person.find().then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        })
    }

    mongoose.connection.close()
}

main().catch(err => console.log(err))