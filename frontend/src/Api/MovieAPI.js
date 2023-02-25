
const MovieAPI = () => {

}

export const getMovies = () => (
    fetch('/movies.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => res.json())
)

export const getMovie = (id) => (
    fetch('/movies.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => res.json())
)

export const getHeroes = (size) => (
    // w92, w154, w185, w342, w500, or w780
    fetch('/movies.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res => res.json()).then((res) => (
        res.map((movie) => ({title: movie.title, url: `https://image.tmdb.org/t/p/${size}${movie.backdrop}`}))
    ))
)

export default MovieAPI