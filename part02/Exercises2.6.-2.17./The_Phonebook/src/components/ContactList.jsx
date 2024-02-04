import { tableStyle } from '../styles/styles'
import Person from './Person'

const ContactList = ({ peopleToShow, handleDelete }) => {
  return (
    <div>
      <table>
        <caption>Contacts</caption>
        <thead>
          <tr>
            <th >Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {peopleToShow.map((person) => (
            <Person
              key={person.id}
              person={person}
              handleDelete={() => handleDelete(person)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList
