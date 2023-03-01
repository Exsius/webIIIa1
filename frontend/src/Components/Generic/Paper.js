import { useTheme } from '../../Context/Theme'

// Generic paper card with sx prop because I hate tailwind and love mui

const Paper = (props) => {

    const themeContext = useTheme()

    const { theme } = themeContext

    return (
        <div style={{ backgroundColor: theme.base, ...props.sx }} className={`w-auto p-6 border border-gray-200 rounded-lg shadow${props.className ? ' ' + props.className : ''}`}>
            {props.children}
        </div>
    )
}

export default Paper