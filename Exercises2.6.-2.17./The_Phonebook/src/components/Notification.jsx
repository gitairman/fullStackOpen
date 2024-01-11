const Notification = ({ message }) => {
    const errorStyle = { 
        color: 'red',
        padding: 10,
        margin: 10,
        borderStyle: 'solid'
    }
    const infoStyle = { 
        color: 'green',
        padding: 10,
        margin: 10,
        borderStyle: 'solid'
    }
    let messagePrefix = 'I'


    if (message === null) {
        return null
    } else {
        messagePrefix = message[0]
    }

    return (
        <div style={messagePrefix === 'I' ? infoStyle : errorStyle}>
            {message}
        </div>
    )
}

export default Notification