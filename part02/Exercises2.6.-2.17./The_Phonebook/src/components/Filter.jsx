const Filter = ({ handleFilterChange }) => {
  return (
    <div className="contact-filter">
      <table className="contact-filter">
        <caption>Filter Contacts</caption>
        <tbody>
          <tr>
            <td>
              Filter by{' '}
              <select>
                <option>name</option>
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
