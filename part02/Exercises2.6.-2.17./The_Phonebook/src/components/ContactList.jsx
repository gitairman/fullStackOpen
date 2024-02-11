import { useDispatch, useSelector } from 'react-redux'
import { tableStyle } from '../styles/styles'
import Person from './Person'
import { remove, selectContacts } from '../features/contacts/contactsSlice'
import { selectFilter } from '../features/filter/filterSlice'
import { useEffect } from 'react'

const ContactList = () => {
  const filter = useSelector(selectFilter)
  const contacts = useSelector(selectContacts)
  const dispatch = useDispatch()

  const contactsToShow =
    filter === ''
      ? contacts
      : contacts.filter((contact) =>
          contact[filter.type]
            .toLowerCase()
            .includes(filter.filter.toLowerCase())
        )

  return (
    <div>
      <h2>-- List of Contacts --</h2>
      <table>
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
          {contactsToShow.length === 0 ? (
            <tr className="no-filter-results">
              <td colSpan={'5'}>No records found!</td>
            </tr>
          ) : (
            contactsToShow.map((contact) => (
              <Person key={contact.id} contact={contact} />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList
