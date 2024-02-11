import { useState } from 'react'

export const useField = (type, id, initVal = '') => {
  const name = id
  const placeholder = `write ${name} here`
  const [value, setValue] = useState(initVal)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    id,
    name,
    placeholder,
    type,
    value,
    onChange,
    onReset,
  }
}
