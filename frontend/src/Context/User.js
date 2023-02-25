
import { createContext, useContext, useState, useEffect } from 'react'
import { getMovies } from '../Api/MovieAPI'

const UserContext = createContext({
    favorites: [],
})

export const useUser = () => (
    useContext(UserContext)
)

const UserProvider = (props) => {

    const [user, setUser] = useState({
        favorites: [],
    })

    const [movies, setMovies] = useState([])

    const fetchMovies = () => {
        getMovies().then(res => {
            setMovies(res)
        })
    }

    const getMovie = (id) => {
        const movie = movies.find(movie => movie.id == parseInt(id))
        // stupid fix
        return movie == null ? 'loading' : movie
    }

    const addFavorite = (id) => {
        if (!user.favorites.some(fav => fav.id === id)) {
            const movie = movies.find(movie => movie.id === id)
            setUser({...user, favorites: [...user.favorites, { id: id, title: movie.title, tagline: movie.tagline }]})
        }
    }

    const removeFavorite = (id) => {
        setUser({...user, favorites: user.favorites.filter(favorite => favorite.id !== id)})
    }

    const toggleFavorite = (id) => {
        if (user.favorites.some(fav => fav.id === id)) {
            setUser({...user, favorites: user.favorites.filter(fav => fav.id !== id)})
        } else {
            const movie = movies.find(movie => movie.id === id)
            setUser({...user, favorites: [...user.favorites, { id: id, title: movie.title, tagline: movie.tagline }]})
        }
    }

    const value = {
        user,
        movies,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        fetchMovies,
        getMovie,
    }

    return (
    <UserContext.Provider value={value}>
        {props.children}
    </UserContext.Provider>
    )
}

export default UserProvider