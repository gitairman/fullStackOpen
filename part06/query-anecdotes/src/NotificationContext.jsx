import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    return action
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useMessage = () => {
    return useContext(NotificationContext)[0]
}

export const useMessageDispatch = () => {
    return useContext(NotificationContext)[1]
}

export default NotificationContext