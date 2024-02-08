import { tableStyle } from '../styles/styles'
import Person from './Person'

const ContactList = ({ peopleToShow, handleDelete }) => {
  return (
    <div>
      <h2>-- List of Contacts --</h2>
      <table>
        {/* <caption>Contacts</caption> */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {peopleToShow.length === 0 ? (
            <tr className="no-filter-results">
              <td colSpan={'5'}>No records found!</td>
            </tr>
          ) : (
            peopleToShow.map((person) => (
              <Person
                key={person.id}
                person={person}
                handleDelete={() => handleDelete(person)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList
