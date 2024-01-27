import { useMutation } from '@apollo/client'
import { useField } from './customHooks'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthyearForm = ({ authors }) => {
  const name = useField('text', 'name')
  const born = useField('number', 'year')


  const [updateBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (e) => {
    e.preventDefault()

    updateBorn({ variables: { name: name.value, born: Number(born.value) } })

    name.onReset()
    born.onReset()
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
            Name:
          <select {...name}>
            <option>Please Select Author</option>
            {authors.map(a=> <option key={a.name} >{a.name}</option>)}
          </select>
        </div>
        <div>
            Born:
          <input {...born} />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default BirthyearForm
