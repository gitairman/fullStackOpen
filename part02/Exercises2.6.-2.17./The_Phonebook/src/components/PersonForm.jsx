const PersonForm = ({ elements }) => {
  const [addPerson, handleNameChange, handleNumberChange, newName, newNumber] =
    elements
  return (
    <div className="contact-form">
      <h2>-- Add a New Contact --</h2>
      <form onSubmit={addPerson}>
        <table className="contact-form">
          {/* <caption>Add a New Contact</caption> */}
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input onChange={handleNameChange} value={newName} />
              </td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>
                <input onChange={handleNumberChange} value={newNumber} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td style={{ textAlign: 'left' }}>
                <button type="submit">add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default PersonForm
