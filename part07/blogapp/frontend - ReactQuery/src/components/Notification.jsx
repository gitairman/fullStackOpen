import { memo, useEffect } from 'react'
import { useMessage } from '../NotificationContext'
import { useMessageDispatch } from '../NotificationContext'
import { Alert } from 'react-bootstrap'

const Notification = memo(() => {
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
    // borderStyle: 'solid',
  }

  return (
    <div className='container' id="notification" style={style}>
      <Alert variant={message.type === 'info' ? 'success' : 'danger'}>{message.message}</Alert>
    </div>
  )
})

Notification.displayName = 'Notification'

export default Notification
