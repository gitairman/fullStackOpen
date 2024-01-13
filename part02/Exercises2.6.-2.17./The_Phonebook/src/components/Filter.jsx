const Filter = ({ handleFilterChange }) => {
    return (
      <>
        Filter by name: <input onChange={handleFilterChange} />
      </>
    )
  }

  export default Filter