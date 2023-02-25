import { useTheme } from "../../Context/Theme"

const Rating = (props) => {

    const { disabled, rate } = props

    const theme = useTheme()

    return (
        <div className='flex'>
            <button disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: rate >= 0.2 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
            <button disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: rate >= 0.4 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
            <button disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: rate >= 0.6 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
            <button disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: rate >= 0.8 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
            <button disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: rate === 1 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
        </div>
    )
}

export default Rating