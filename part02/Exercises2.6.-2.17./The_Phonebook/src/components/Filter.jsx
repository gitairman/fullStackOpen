import { useDispatch } from 'react-redux'
import { setFilter } from '../features/filter/filterSlice'
import { useState } from 'react'

const Filter = () => {
  const [newFilter, setNewFilter] = useState('')
  const [newType, setNewType] = useState('name')

  const dispatch = useDispatch()

  const handleTypeChange = ({ target }) => {
    setNewType(target.value)
    dispatch(setFilter({ type: target.value, filter: newFilter }))
  }

  const handleFilterChange = ({ target }) => {
    setNewFilter(target.value)
    dispatch(setFilter({ type: newType, filter: target.value }))
  }

  return (
    <div className="contact-filter">
      <h2>-- Filter Contacts --</h2>
      <table className="contact-filter">
        <tbody>
          <tr>
            <td>
              Filter by{' '}
              <select value={newType} onChange={handleTypeChange}>
                <option>name</option>
                <option>number</option>
              </select>
              :
            </td>
            <td>
              <input value={newFilter} onChange={handleFilterChange} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Filter
