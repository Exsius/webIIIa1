
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
        ratings: [],
    })

    const [movies, setMovies] = useState([])
    const [title, setTitle] = useState('')
    const [genres, setGenres] = useState([])

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

    const addRating = (id, rate) => {
        if (user.ratings.some(rat => rat.id === parseInt(id))) {
            setUser({...user, ratings: user.ratings.map((rat => rat.id === parseInt(id) ? { id: parseInt(id), rate: rate } : rat))})
        } else {
            setUser({...user, ratings: [...user.ratings, { id: parseInt(id), rate: rate }]})
        }
    }

    const getRating = (id) => {
        if (user.ratings.length > 0) {
            return user.ratings.find(rat => rat.id === parseInt(id))?.rate
        } else {
            return 0
        }
    }

    const toggleFavorite = (id) => {
        if (user.favorites.some(fav => fav.id === id)) {
            setUser({...user, favorites: user.favorites.filter(fav => fav.id !== id)})
        } else {
            const movie = movies.find(movie => movie.id === id)
            setUser({...user, favorites: [...user.favorites, { id: id, title: movie.title, tagline: movie.tagline }]})
        }
    }

    const toggleGenre = (genre) => {
        if (genres.some(gen => gen === genre)) {
            setGenres(genres.filter(gen => gen !== genre))
        } else {
            if (Array.isArray(genre)) {
                setGenres([...genres, ...genre])
            } else {
                setGenres([...genres, genre])
            }
        }
    }

    const value = {
        user,
        movies,
        title,
        genres,
        setTitle,
        addRating,
        getRating,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        fetchMovies,
        getMovie,
        toggleGenre,
    }

    return (
    <UserContext.Provider value={value}>
        {props.children}
    </UserContext.Provider>
    )
}

export default UserProvider