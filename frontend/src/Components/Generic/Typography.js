import { useState, useEffect } from 'react'
import { useTheme } from '../../Context/Theme'

const Typography = (props) => {

    const theme = useTheme()

    const { variant, sx, children } = props
    const [type, setType] = useState('')

    useEffect(() => {
        switch(variant) {
            case 'h1':
                setType('text-3xl font-bold')
                break;
            case 'h2':
                setType('text-xl font-bold')
                break;
            case 'h3':
                setType('font-bold')
                break;
            case 'body':
                setType('')
                break;
            case 'subtitle':
                setType('font-mono text-sm')
                break;
            default:
                setType('')
                break;
        }
    },[variant])

    return (
        <p style={{ color: theme.neutral, ...sx }} className={type}>
            {children}
        </p>
    )
}

export default Typography