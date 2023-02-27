import { useTheme } from "../../Context/Theme"
import {useState } from "react"
import { useUser } from "../../Context/User"

const Rating = (props) => {

    const { disabled, rate, onClick } = props

    const theme = useTheme()

    const [inputRating, setInputRating] = useState(0)

    return (
        <div className='flex'>
            <button onClick={() => {onClick(inputRating)}} onMouseLeave={() => {setInputRating(0)}} onMouseEnter={() => {setInputRating(0.2)}} disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: inputRating > 0   || rate >= 0.2 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
            <button onClick={() => {onClick(inputRating)}} onMouseLeave={() => {setInputRating(0)}} onMouseEnter={() => {setInputRating(0.4)}} disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: inputRating > 0.2 || rate >= 0.4 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
            <button onClick={() => {onClick(inputRating)}} onMouseLeave={() => {setInputRating(0)}} onMouseEnter={() => {setInputRating(0.6)}} disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: inputRating > 0.4 || rate >= 0.6 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
            <button onClick={() => {onClick(inputRating)}} onMouseLeave={() => {setInputRating(0)}} onMouseEnter={() => {setInputRating(0.8)}} disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: inputRating > 0.6 || rate >= 0.8 ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
            <button onClick={() => {onClick(inputRating)}} onMouseLeave={() => {setInputRating(0)}} onMouseEnter={() => {setInputRating(1)}}   disabled={disabled} style={{ height: 'auto', width: 'auto', fontSize: '1.5em', color: inputRating > 0.8 || rate === 1  ? theme.rating : theme.disabled }} className='rounded-full w-6 h-6'>★</button>
        </div>
    )
}

export default Rating