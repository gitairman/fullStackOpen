const Persons = ({ persons, newFilter }) => {
    return (
      <>
        {newFilter ?
          persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => <p key={person.name}>{person.name}: {person.number}</p>) :
          persons.map(person => <p key={person.name}>{person.name}: {person.number}</p>)
        }
      </>
    )
  }

  export default Persons