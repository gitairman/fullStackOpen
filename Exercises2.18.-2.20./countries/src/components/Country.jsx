const Country = ({ name, handleShowClick }) => {
    return (
        <>
            <li>
                {name} <button name={name} onClick={handleShowClick}>show details</button>
            </li>
            <br></br>
        </>
    )
}

export default Country