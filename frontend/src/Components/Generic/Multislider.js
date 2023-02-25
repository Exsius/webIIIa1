import { useState } from "react"
import Typography from "./Typography"

const Multislider = (props) => {

    const { type, range, } = props

    //weird weird glitch man,,,, no clue........ too tired to even comprehend,,,,,, cant use [0,100]
    const [sliderPos, setSliderPos] = useState([10,99])
    const [rangeLimitState, setRangeLimitState] = useState(range ? range : [1,100])
    const [rangeInputState, setRangeInputState] = useState(range ? range : [1,100])
    const [rangeState, setRangeState] = useState(range ? range : [1,100])

    const sliderStyle = {
        position: 'absolute',
        webkitAppearance: 'none',
        mozAppearance: 'none',
        appearance: 'none',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
    }

    const handleSliderChange = (e) => {
        const { value, id } = e.target
        if ((id == 0 & value < sliderPos[1]-8) || (id == 1 & value-8 > sliderPos[0])) {
            setSliderPos([id == 0 ? value : sliderPos[0], id == 1 ? value : sliderPos[1]])
            setRangeState([id == 0 ? Math.floor((sliderPos[0]/10) * rangeLimitState[0]) : rangeState[0], id == 1 ? Math.floor(rangeState[1] * (sliderPos[0]/sliderPos[1]))+2 : rangeState[1]])
        }
    }

    const handleInputChange = (e) => {
        const { value, id } = e.target
        const filter = new RegExp('^[0-9]+$')
        type === 'number'
        ?
        filter.test(value) && setRangeInputState([id === 'low-range' ? value : rangeInputState[0], id === 'high-range' ? value
        :
        rangeInputState[1]]) : setRangeInputState([id === 'low-range' ? value : rangeInputState[0], id === 'high-range' ? value : rangeInputState[1]])
    }

    const handleInputBlur = (e) => {
        const { value, id } = e.target
        if ((id === 'low-range' && value > rangeLimitState[1]) || (id === 'high-range' && value < rangeLimitState[0])) {
            setRangeInputState([id === 'low-range' ? rangeLimitState[0] : rangeInputState[0], id === 'high-range' ? rangeLimitState[1] : rangeInputState[1]])
        }  else {
            setRangeLimitState([id === 'low-range' ? rangeInputState[0] : rangeLimitState[0], id === 'high-range' ? rangeInputState[1] : rangeLimitState[1]])
            setRangeState([id === 'low-range' ? Math.floor(rangeInputState[0] * (sliderPos[0]/sliderPos[1])) : rangeState[0], id === 'high-range' ? Math.floor(rangeInputState[1]-1 * (sliderPos[0]/sliderPos[1]))+2 : rangeState[1]])
        }
    }

    return (
        <>
            <Typography variant='h3'>Between: {rangeState[0]} - {rangeState[1]}</Typography>
            <div className='bg-slate-400 w-full h-1 rounded' style={{ position: 'relative', top: '16px', width: 'calc(100% - 15px)' }}></div>
            <div className='bg-blue-600 h-1 rounded' style={{ position: 'relative', top: '12px', left: `${-2+sliderPos[0]*2}px`, width: `${-8+(sliderPos[1]-sliderPos[0])*2}px` }}></div>
            <div>
                <input type='range' min='10' max='99' value={sliderPos[0]} id='0' onChange={handleSliderChange} style={sliderStyle}></input>
                <input type='range' min='10' max='99' value={sliderPos[1]} id='1' onChange={handleSliderChange} style={sliderStyle}></input>
            </div>
            <div className='flex justify-between' style={{width: 'calc(100% - 12px)', paddingTop: '24px'}}>
                <input type="text" id="low-range" onChange={handleInputChange} onBlur={handleInputBlur} value={rangeInputState[0]} className='w-12 bg-neutral-200 rounded'/>
                <input type="text" id="high-range" onChange={handleInputChange} onBlur={handleInputBlur} value={rangeInputState[1]} className='w-12 bg-neutral-200 rounded'/>
            </div>
        </>
    )
}

export default Multislider