const Person = ({person, handleDelete}) => {
    return (
        <li style={{listStyle: "none", padding: 0, margin: 10}}>
            {person.name}: {person.number}
            <button style={{marginLeft: 10}} onClick={handleDelete}>delete</button>
        </li>
    )
}

export default Person