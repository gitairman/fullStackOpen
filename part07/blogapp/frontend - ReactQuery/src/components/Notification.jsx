import { useEffect } from 'react'
import { useMessage } from '../NotificationContext'
import { useMessageDispatch } from '../NotificationContext'

const Notification = () => {
  const message = useMessage()
  const dispatchMessage = useMessageDispatch()

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        dispatchMessage(null)
      }, 3000)
    }
  }, [message])

  if (message === null) {
    return null
  }

  const style = {
    color: message.type === 'info' ? 'green' : 'red',
    padding: 10,
    margin: 10,
    borderStyle: 'solid',
  }

  return (
    <div id="notification" style={style}>
      {message.message}
    </div>
  )
}

export default Notification
