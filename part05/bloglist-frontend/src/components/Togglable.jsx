import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hidden = { display: visible ? 'none': ''}
    const shown = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hidden}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div><br />
            <div style={shown}>
                {props.children}
                <button style={{marginBottom: 10}} onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable