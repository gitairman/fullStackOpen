import { useContext } from "react"
import { useMessage } from "../NotificationContext"

const Notification = () => {

  const message = useMessage()
  const error = message.includes('ERROR')

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: error ? 'red' : 'black',
    color: error ? 'red' : 'black'
  }
  
  if (message === '') return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
