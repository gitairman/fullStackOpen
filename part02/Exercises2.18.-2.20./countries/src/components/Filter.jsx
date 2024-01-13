const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
            Find countries: <input type="text" value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter