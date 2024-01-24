
import { filterChange } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    const handleChange = ({ target }) => {
        dispatch(filterChange(target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} value={filter} />
        </div>
    )
}

export default Filter