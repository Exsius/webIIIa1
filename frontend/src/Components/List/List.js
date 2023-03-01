import Paper from "../Generic/Paper"
import Skeleton from "../Generic/Skeleton"
import Typography from "../Generic/Typography"
import Card from "./Card"
import { useState, useEffect } from "react"
import Button from "../Generic/Button"
import { useUser } from "../../Context/User"
import Popover from "../Movie/Popover"
import { useSearchParams, useParams, useNavigate } from "react-router-dom"
import { useTheme } from "../../Context/Theme"
import Rating from "../Generic/Rating"


const List = (props) => {

    const theme = useTheme()
    const user = useUser()
    const { movies, genres, setTitle, title, yearRange, ratingRange, fetchMovies, getMovie, addRating, getRating, popover, togglePopover, toggleFavorite } = user
    const { id } = useParams()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [cardAmt, setCardAmt] = useState(0)
    const [activeMovie, setActiveMovie] = useState({})
    const popoverVisible = popover
    const [posterPopover, togglePosterPopover] = useState(false)
    const [filteredMovies, setFilteredMovies] = useState(movies)
    // dumb work around
    const [noMoviesFound, setNoMoviesFound] = useState(false)

    useEffect(() => {
        fetchMovies()
    },[])

    useEffect(() => {
        if (movies.length > 0) {
            const titleParam = title
            const genreParam = genres.filter(genre => genre)
            const yearParam = yearRange
            const ratingParam = ratingRange
            let filteredMovies = movies
            if (titleParam) {
                const titleReg = new RegExp(titleParam, 'i')
                filteredMovies = filteredMovies.filter(movie => titleReg.test(movie.title))
            }
            if (genreParam) {
                const genreReg = new RegExp(genreParam.map((genre, index) => `(${genre})`).join('|'), 'i')
                filteredMovies = filteredMovies.filter(movie => movie.details.genres && genreReg.test(movie.details.genres.map(genre => genre.name).toString()))
            }
            if (yearParam) {
                filteredMovies = filteredMovies.filter(movie =>  {
                    const year = parseInt(movie.release_date.substring(0,4))
                    return year >= yearParam[0] && year <= yearParam[1]
                })
            }
            if (ratingParam) {
                filteredMovies = filteredMovies.filter(movie =>  {
                    const rate = movie.ratings.average
                    return rate >= ratingParam[0] && rate <= ratingParam[1]
                })
            }
            setFilteredMovies(filteredMovies)
            filteredMovies.length === 0 && movies.length > 0 && setNoMoviesFound(true)
        }
    },[user])

    useEffect(() => {
        if (id) {
            const movie = getMovie(id)
            if (movie) {
                setActiveMovie(movie)
                togglePopover(true)
            } else {
                navigate('/movies')
            }
        }
    },[user])

    return (
        <div className='flex grow flex-col p-1 py-6'>
            <div className='grid grow gap-4' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                {movies.length !== 0 ? filteredMovies.map((movie) => (
                    <Card
                    key={movie.id}
                    image={`https://image.tmdb.org/t/p/w342${movie.backdrop}`}
                    title={movie.title}
                    caption={`(${movie.release_date.substring(0, 4)})`}
                    subtitle={[`\$${Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(movie.revenue)}`, `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`, movie.details.genres && movie.details.genres.map((genre) => ` ${genre.name}`)]}
                    rating={movie.ratings.average / 10}
                    popularity={Math.round(movie.ratings.popularity)}
                    id={movie.id}
                    onFavorite={() => {user.toggleFavorite(movie.id)}}
                    onView={() => {setActiveMovie(movie); togglePopover()}}
                    >
                        <div className='flex flex-col items-end pt-2'>
                            <div className='flex w-full'>
                                <Typography variant='h3'>Summary</Typography>
                                <div className='grow'></div>
                            </div>
                            <Typography>
                                {movie.details.overview.length > 250 ? `${movie.details.overview.substring(0, 250)}...` : movie.details.overview}
                            </Typography>
                            <Button onClick={() => {setActiveMovie(movie); togglePopover(true)}} variant='text'>
                                ...More
                            </Button>
                        </div>
                    </Card>
                    )
                )
                :
                [...Array(10).keys()].map((skeleton, index) => (
                    <Paper key={`skeleton-${index}`} sx={{ padding: '0px', overflow: 'hidden', width: '292px', display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '372px' }}>
                        <Skeleton sx={{ height: '288px', margin: '0px' }}></Skeleton>
                        <Skeleton sx={{ height: '64px', margin: '1rem 16px' }}></Skeleton>
                        <Skeleton sx={{ height: '140px', margin: '0.1rem 16px 1rem 16px' }}></Skeleton>
                        <Skeleton sx={{ height: '42px', margin: '0.3rem 16px 1rem 16px' }}></Skeleton>
                    </Paper>
                ))
                }
                {filteredMovies.length > 0 && <div style={{flexGrow: 3}}></div>}
            </div>
            {noMoviesFound && <div className='py-36 w-full text-center'>
                <Typography variant='h1'>No movies found :~( </Typography>
            </div>}
            <Popover movieid={activeMovie.id} visible={popoverVisible} onClose={() => {togglePopover(false)}}>
            <div className="fade-in w-2/3 h-2/3 mt-1 bg-white border border-gray-200 rounded-md drop-shadow-2xl" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w780${activeMovie.backdrop}')`, backgroundSize: 'cover' }}>
                <div className="fade-in w-full h-full p-2 rounded-md" style={{ overflow: 'hidden', background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.84) 24%, rgba(255,255,255,0.92) 25%, rgba(255,255,255,1) 100%)' }}>
                    <div className='flex justify-between'>
                        <Button variant={user.user.favorites.some(fav => fav.id === activeMovie.id) ? 'filled' : 'outlined'} className='rounded-full' onClick={() => {toggleFavorite(activeMovie.id)}}>❤️</Button>
                        <Button className='rounded-full close-trigger' sx={{ backgroundColor: 'white', color: theme.primary }} onClick={close}>X</Button>
                    </div>
                    <div className='flex items-start py-12 h-full px-6 gap-3'>
                        {activeMovie.poster ?
                        <img onClick={() => {togglePosterPopover(!posterPopover)}} src={`https://image.tmdb.org/t/p/w185${activeMovie.poster}`} className='rounded-md' style={{ cursor: 'pointer' }}></img>
                        :
                        <Skeleton sx={{ height: '70%', width: '240px' }}></Skeleton>
                        }
                        <div className='flex self-stretch flex-col'>
                            <div className='flex flex-col grow'>
                                {activeMovie !== 'loading' ? 
                                    <>
                                        <Typography variant='h1' sx={{ fontSize: '2.4em' }}>{activeMovie.title}</Typography>
                                        <Typography sx={{ fontSize: '1em' }}>{activeMovie.tagline}</Typography>
                                        <Typography variant='subtitle' sx={{ fontWeight: 'bold', fontSize: '1.2em', paddingTop: '18px' }}>
                                            {[`\$${Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(activeMovie.revenue)} revenue`, `${Math.floor(activeMovie.runtime / 60) === 1 ? + 1 + ' hour' : Math.floor(activeMovie.runtime / 60) + ' hours'} and ${activeMovie.runtime % 60 === 1 ? 1+ ' minute' : activeMovie.runtime % 60 + ' minutes'}`].map((sub, index) => (
                                                sub && `${index !== 0 ? ' / ' : ''}${sub}`
                                            ))}
                                        </Typography>
                                        <div className='flex flex-wrap gap-3 pb-4 pt-2'>
                                            {activeMovie?.details?.genres && activeMovie.details.genres.map((genre) => (
                                                <Button key={genre.name} variant='h1' sx={{ padding: '0px 5px', margin: '0px' }} className='rounded-full'>{genre.name}</Button>
                                            ))}
                                            <Typography variant='h3'>
                                                🍿{'>'}{Math.round(activeMovie?.ratings?.popularity)}
                                            </Typography>
                                            <Typography variant='h3'>
                                                ⭐{activeMovie?.ratings?.average}
                                            </Typography>
                                            <Typography variant='h3'>
                                                👤{activeMovie?.ratings?.count}
                                            </Typography>
                                        </div>
                                        <Typography sx={{ fontSize: '1.1em' }}>{activeMovie?.details?.overview && activeMovie.details.overview}</Typography>
                                        <div className='flex gap-2 pt-3 pb-4'>
                                            <Button onClick={() => {window.location.href = `https://www.imdb.com/title/${activeMovie && activeMovie.imdb_id}`}} variant='filled' className='rounded-full' sx={{ padding: '0px 16px', fontWeight: 'bold', color: 'black', backgroundColor: theme.imdb, borderColor: theme.imdb }}>IMDB</Button>
                                            <Button onClick={() => {window.location.href = `https://www.themoviedb.org/movie/${activeMovie && activeMovie.tmdb_id}`}} variant='filled' className='rounded-full' sx={{ padding: '0px 16px', fontWeight: 'bold', color: '#71c3ab', backgroundColor: theme.tmdb, borderColor: theme.tmdb }}>TMDB</Button>
                                        </div>
                                    </>
                                    :
                                    <div className='flex flex-col gap-2' style={{ width: '160%' }}>
                                        <Skeleton sx={{ flexGrow: 1, height: '64px'}}></Skeleton>
                                        <Skeleton sx={{ flexGrow: 1, height: '148px', width: '150%'}}></Skeleton>
                                    </div>
                                    }
                            </div>
                            <div>
                                <div className='flex'>
                                    <div className='flex items-center gap-3 pl-4' style={{ borderColor: theme.primary, borderRadius: '100px', overflow: 'hidden', borderWidth: '2px' }}>
                                        <Typography>Share your thoughts, </Typography>
                                        <div style={{ backgroundColor: theme.primary, padding: '0px 9px' }}>
                                            <Rating rate={getRating(activeMovie.id)} onClick={(rate) => {addRating(id, rate)}} />
                                        </div>
                                    </div>
                                    <div className='grow' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Popover>
            <Popover visible={posterPopover} onClose={() => {togglePosterPopover(false)}}>
                <img src={`https://image.tmdb.org/t/p/w500${activeMovie.poster}`} className='rounded-md'></img>
            </Popover>
        </div>
    )
}

export default List