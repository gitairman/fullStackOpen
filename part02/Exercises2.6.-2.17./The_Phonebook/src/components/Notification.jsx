import { errorStyle, infoStyle } from "../styles/styles"

const Notification = ({ message }) => {

    if (message === null) {
        return null
    }

    return (
        <div style={message.type === 'info' ? infoStyle : errorStyle}>
            {message.message}
        </div>
    )
}

export default Notification