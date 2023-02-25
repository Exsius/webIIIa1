import Paper from "../Generic/Paper"
import Skeleton from "../Generic/Skeleton"
import Typography from "../Generic/Typography"
import Card from "./Card"
import { useState, useEffect } from "react"
import Button from "../Generic/Button"
import { useUser } from "../../Context/User"
import Popover from "../Movie/Popover"
import { useSearchParams, useParams, useNavigate } from "react-router-dom"


const List = (props) => {

    const user = useUser()
    const { movies, fetchMovies, getMovie } = user
    const { id } = useParams()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const [cardAmt, setCardAmt] = useState(0)
    const [activeMovie, setActiveMovie] = useState({})
    const [popoverVisible, setPopoverVisible] = useState(false)

    useEffect(() => {
        fetchMovies()
    },[])

    useEffect(() => {
        if (id) {
            const movie = getMovie(id)
            if (movie) {
                setActiveMovie(movie)
                setPopoverVisible(true)
            } else {
                navigate('/movies')
            }
        }
    },[user])

    return (
        <div className='flex flex-col p-1 py-6'>
            <div className='flex flex-wrap gap-4'>
                {movies.map((movie) => (
                    <Card
                    image='https://image.tmdb.org/t/p/w500/wby9315QzVKdW9BonAefg8jGTTb.jpg'
                    title={movie.title}
                    caption={`(${movie.release_date.substring(0, 4)})`}
                    subtitle={[`\$${Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(movie.revenue)}`, `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`, movie.details.genres && movie.details.genres.map((genre) => ` ${genre.name}`)]}
                    rating={movie.ratings.average / 10}
                    popularity='43'
                    id={movie.id}
                    onFavorite={() => {user.toggleFavorite(movie.id)}}
                    onView={() => {setActiveMovie(movie); setPopoverVisible(!popoverVisible)}}
                    >
                        <div className='flex flex-col items-end pt-2'>
                            <div className='flex w-full'>
                                <Typography variant='h3'>Summary</Typography>
                                <div className='grow'></div>
                            </div>
                            <Typography>
                                {movie.details.overview.length > 400 ? `${movie.details.overview.substring(0, 400)}-` : movie.details.overview}
                            </Typography>
                            <Button onClick={() => {setActiveMovie(movie); setPopoverVisible(true)}} variant='text'>
                                ...More
                            </Button>
                        </div>
                    </Card>
                    )
                )}
                <div style={{flexGrow: 1}}></div>
            </div>
            <Popover movieid={activeMovie.id} visible={popoverVisible} onClose={() => {setPopoverVisible(false)}}>
                <div className='flex justify-between'>
                    <Typography variant='h1'>{activeMovie && activeMovie.title}</Typography>
                </div>
            </Popover>
        </div>
    )
}

export default List