import { useState, useEffect } from "react"
import Typography from "./Typography"

const Multislider = (props) => {

    const { type, range, onBlur, value } = props

    const [sliderPos, setSliderPos] = useState(value ? value : (range ? range : [0,100]))

    const sliderStyle = {
        position: 'absolute',
        webkitAppearance: 'none',
        mozAppearance: 'none',
        appearance: 'none',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        width: '88%',
    }

    const handleSliderChange = (e) => {
        const { value, id } = e.target
        if ((id == 0 & parseInt(value) < sliderPos[1]) || (id == 1 & parseInt(value) > sliderPos[0])) {
            setSliderPos([id == 0 ? parseInt(value) : sliderPos[0], id == 1 ? parseInt(value) : sliderPos[1]])
        }
    }

    return (
        <>
            <Typography variant='h3'>Between: {sliderPos[0]} - {sliderPos[1]}</Typography>
            <div className='bg-slate-400 w-full h-1 rounded' style={{ position: 'relative', top: '16px', width: 'calc(100% - 15px)' }}></div>
            <div className='bg-blue-600 h-1 rounded' style={{ position: 'relative', top: '12px', left: `${(parseInt(sliderPos[0])-parseInt(range ? range[0] : 100))*(220/(range ? parseInt(range[1])-parseInt(range[0]) : 100))}px`, width: `${(parseInt(sliderPos[1]) - parseInt(sliderPos[0]))*(220/(range ? parseInt(range[1])-parseInt(range[0]) : 100))}px` }}></div>
            <div>
                <input step='1' type='range' min={range ? range[0] : 1} max={range ? range[1] : 100} value={sliderPos[0]} id='0' onMouseUp={(e) => {onBlur([parseInt(e.target.value) <= sliderPos[1] ? parseInt(e.target.value) : sliderPos[0], sliderPos[1]])}} onChange={(e) => {handleSliderChange(e)}} style={sliderStyle}></input>
                <input step='1' type='range' min={range ? range[0] : 1} max={range ? range[1] : 100} value={sliderPos[1]} id='1' onMouseUp={(e) => {onBlur([sliderPos[0], parseInt(e.target.value) >= sliderPos[0] ? parseInt(e.target.value) : sliderPos[1]])}} onChange={(e) => {handleSliderChange(e)}} style={sliderStyle}></input>
            </div>
            <div className='h-8'></div>
        </>
    )
}

export default Multislider