import { useMutation } from '@apollo/client'
import { useField } from './customHooks'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'

const BirthyearForm = ({ authors }) => {
  const name = useField('text', 'name')
  const born = useField('number', 'year')
  const [message, setMessage] = useState({type: true, message: ''})


  const [updateBorn] = useMutation(EDIT_AUTHOR, {
    onCompleted: ({editBorn}) => {
        setMessage({type: true, message: `Successfully updated birthyear of ${editBorn.name}`})
        name.onReset()
        born.onReset()
    },
    onError: (err) => {
        console.log(err)
        setMessage({type: false, message: (err.graphQLErrors[0].message + ', please log in').toUpperCase()})
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (e) => {
    e.preventDefault()

    updateBorn({ variables: { name: name.value, born: Number(born.value) } })
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
            Name:
          <select {...name} onFocus={() => setMessage({type: true, message: ''})}>
            <option>Please Select Author</option>
            {authors.map(a=> <option key={a.name} >{a.name}</option>)}
          </select>
        </div>
        <div>
            Born:
          <input {...born} />
        </div>
        <button type='submit'>update</button>
        <p style={{display: message.message !== '' ? '': 'none', color: message.type ? 'green': 'red'}}>{message.message}</p>
      </form>
    </div>
  )
}

export default BirthyearForm
