const Persons = ({ persons, newFilter, handleDelete }) => {
    let peopleToRender = []
    let itemsToRender = []

    if (newFilter === '') {
        peopleToRender = persons
    } else {
        peopleToRender = persons.filter(person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase()))
    }
    itemsToRender = peopleToRender.map(person =>
        <p key={person.name}>{person.name}: {person.number}
        <button onClick={handleDelete} key={person.id} data-name={person.name} data-id={person.id}>delete</button>
        </p>

    )
    return (
        itemsToRender
    )
}

export default Persons