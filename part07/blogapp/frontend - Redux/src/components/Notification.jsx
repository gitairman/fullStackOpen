import { useSelector } from 'react-redux'
import { selectMessage } from '../reducers/notificationSlice'

const Notification = () => {
  const message = useSelector(selectMessage)

  const errorStyle = {
    color: 'red',
    padding: 10,
    margin: 10,
    borderStyle: 'solid',
  }
  const infoStyle = {
    color: 'green',
    padding: 10,
    margin: 10,
    borderStyle: 'solid',
  }

  if (message === null) {
    return null
  }

  return (
    <div
      id="notification"
      style={message.type === 'info' ? infoStyle : errorStyle}
    >
      {message.message}
    </div>
  )
}

export default Notification
