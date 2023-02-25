import { useTheme } from "../../Context/Theme"
import Button from "../Generic/Button"
import Multislider from "../Generic/Multislider"
import Paper from "../Generic/Paper"
import { useState, useEffect } from 'react'
import Typography from "../Generic/Typography"

const Dropdown = (props) => {

    const theme = useTheme()

    const [visible, setVisible] = useState(false)
    const [buttonPos, setButtonPos] = useState([0,0])

    const close = (e) => {
        const { classList } = e.target
        if (classList.contains('close-trigger')) {
            const closes = document.querySelectorAll('.close-trigger')
            closes.forEach((el) => el.classList.add('fade-out'))
            setTimeout(() => {
                closes.forEach((el) => el.classList.remove('fade-out'))
                setVisible(false)
            }, 200)
        }
    }

    const Panel = (props) => {
        if (props.visible) {
            return (
                <div onClick={close} className='close-trigger' style={{ position: 'absolute', height: '100vh', width: '100vw', top: '0px', left: '0px' }}>
                    <div style={{position: 'absolute', left: `${buttonPos[0]}px`, top: `${buttonPos[1]}px` }} className="fade-in w-64 p-2 mt-1 bg-white border border-gray-200 rounded-md drop-shadow-2xl">
                        <div className='flex flex-row justify-between content-center rounded-t-lg' style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', margin: '-8px -8px 8px -8px', padding: '8px' }}>
                            <Typography variant='h2'>{props.label}</Typography>
                            <Button className='close-trigger' onClick={close} variant='text' sx={{ backgroundColor: 'white', color: theme.primary }}>X</Button>
                        </div>
                        {props.children}
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <Button className={props.className} sx={{ flexGrow: 1 }} startIcon={props.startIcon} endIcon={props.endIcon} variant='outlined' onClick={(e) => {setVisible(!visible); setButtonPos([e.offsetLeft, e.offsetTop + e.clientHeight])}}>
                {props.label}
            </Button>
            <Panel visible={visible} label={props.label} children={props.children} />
        </>
    )
}

export default Dropdown