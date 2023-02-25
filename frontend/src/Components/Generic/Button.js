import { useTheme } from "../../Context/Theme"
import { useState, useEffect } from 'react'

const Button = (props) => {

    const theme = useTheme()

    const [style, setStyle] = useState({ backgroundColor: theme.primary, color: theme.base, borderColor: theme.primary, borderWidth: '1px', ...props.sx })
    const [endIcon, setEndIcon] = useState(props.endIcon)
    const [startIcon, setStartIcon] = useState(props.startIcon)

    useEffect(() => {
        props.variant === 'outlined' && setStyle({ backgroundColor: 'transparent', color: theme.primary, borderColor: theme.primary, borderWidth: '1px', ...props.sx })
        props.variant === 'text' && setStyle({ backgroundColor: 'transparent', color: theme.primary, borderColor: 'transparent', borderWidth: '1px', ...props.sx })
        props.variant === 'filled' && setStyle({ backgroundColor: theme.primary, color: theme.base, borderColor: theme.primary, borderWidth: '1px', ...props.sx })
    }, [theme, props.variant])
    
    return (
        <button style={style} className={`flex py-1 px-3 ${props.className}`} id={props.id} onClick={(e) => {e.target.nodeName === 'DIV' ? props.onClick(e.target.parentElement) : props.onClick(e.target)}}>
            {startIcon && <><div className='pr-2 mr-2 border-r-2'>
                {startIcon}
            </div></>}
            {props.children}
            {endIcon && <>
            <div className='pl-2 ml-2 border-l-2'>
                {endIcon}
            </div></>}
        </button>
    )
}

export default Button