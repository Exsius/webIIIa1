
import { createContext, useContext } from 'react'

const theme = {
    primary: '#6699CC',
    secondary: 'white',
    base: 'white',
    neutral: '#0F172A',
    rating: '#FFCC00',
    disabled: '#D3D3D3',
    imdb: '#e6b91e',
    tmdb: '#03243f',
}

const ThemeContext = createContext(theme)

export const useTheme = () => (
    useContext(ThemeContext)
)

const ThemeProvider = (props) => {
    return (
    <ThemeContext.Provider value={theme}>
        {props.children}
    </ThemeContext.Provider>
    )
}

export default ThemeProvider