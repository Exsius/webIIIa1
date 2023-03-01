
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext({
    primary: '#6699CC',
    secondary: 'white',
    base: 'white',
    neutral: '#0F172A',
    rating: '#FFCC00',
    disabled: '#D3D3D3',
    imdb: '#e6b91e',
    tmdb: '#03243f',
})

export const useTheme = () => (
    useContext(ThemeContext)
)

const ThemeProvider = (props) => {

    const [theme, setTheme] = useState({
        primary: '#6699CC',
        secondary: 'white',
        base: 'white',
        neutral: '#0F172A',
        rating: '#FFCC00',
        disabled: '#D3D3D3',
        imdb: '#e6b91e',
        tmdb: '#03243f',
    })

    const value = {
        theme,
        setTheme,
    }

    return (
    <ThemeContext.Provider value={value}>
        {props.children}
    </ThemeContext.Provider>
    )
}

export default ThemeProvider