import { useSelector } from 'react-redux'
import { errorStyle, infoStyle } from '../styles/styles'
import { selectMsg } from '../features/notify/notifySlice'

const Notification = () => {
  const message = useSelector(selectMsg)

  if (message === null) {
    return null
  }

  return (
    <div style={message.type === 'info' ? infoStyle : errorStyle}>
      {message.msg}
    </div>
  )
}

export default Notification
