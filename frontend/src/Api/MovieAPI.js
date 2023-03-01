
const MovieAPI = () => {

}

export const getMovies = async() => {
    const movies = localStorage.getItem('movies')
    if (!movies) {
        return fetch('https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=200', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => (res.json()))
        .then(res => {
            localStorage.setItem('movies', JSON.stringify(res))
            return res
        })
    } else {
        return await JSON.parse(movies)
    }
}

export const getMovie = async(id) => {
    const movies = localStorage.getItem('movies')
    if (!movies) {
        return fetch('https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=200', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => (res.json()))
        .then(res => {
            localStorage.setItem('movies', JSON.stringify(res))
            return res
        })
    } else {
        return await JSON.parse(movies)
    }
}

export const getHeroes = async(size) => {
    // w92, w154, w185, w342, w500, or w780
    const movies = localStorage.getItem('movies')
    if (!movies) {
        return fetch('/https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=200', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => (res.json()))
        .then(res => {
            localStorage.setItem('movies', JSON.stringify(res))
            return res.map((movie) => ({title: movie.title, url: `https://image.tmdb.org/t/p/${size}${movie.backdrop}`}))
        })
    } else {
        const moviesArr = await JSON.parse(movies)
        return moviesArr.map((movie) => ({title: movie.title, url: `https://image.tmdb.org/t/p/${size}${movie.backdrop}`}))
    }
}

export default MovieAPI