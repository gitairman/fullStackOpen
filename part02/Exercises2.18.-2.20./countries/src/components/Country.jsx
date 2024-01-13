const Country = ({ name, handleShowClick }) => {
    return (
        <li style={{ margin: 10 }}>
            {name}
            <button style={{margin: 10}} name={name} onClick={handleShowClick}>show details</button>
        </li>
    )
}

export default Country