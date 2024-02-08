const Filter = ({ handleFilterChange, filterType, setFilterType }) => {
  return (
    <div className="contact-filter">
      <h2>-- Filter Contacts --</h2>
      <table className="contact-filter">
        {/* <caption>Filter Contacts</caption> */}
        <tbody>
          <tr>
            <td>
              Filter by{' '}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}>
                <option>name</option>
                <option>number</option>
              </select>
              :
            </td>
            <td>
              <input onChange={handleFilterChange} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Filter
