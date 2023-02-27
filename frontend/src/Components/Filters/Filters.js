import { useTheme } from "../../Context/Theme"
import Button from "../Generic/Button"
import Multislider from "../Generic/Multislider"
import Paper from "../Generic/Paper"
import Dropdown from "./Dropdown"
import { useUser } from "../../Context/User"
import Typography from "../Generic/Typography"
import { useState, useEffect } from "react"
import { useSearchParams, history } from "react-router-dom"

const Filters = () => {

    const user = useUser()
    const theme = useTheme()

    const [searchParams, setSearchParams] = useSearchParams()

    const { removeFavorite, toggleGenre, genres, setTitle } = user

    const genresArr = [
        'Drama',
        'Action',
        'Crime',
        'War',
        'Animation',
        'Comedy',
        'Family',
        'Thriller',
        'Music',
        'Romance',
        'Adventure',
        'Fantasy',
        'Science Fiction',
        'Horror',
        'Mystery',
    ]

    const [input, setInput] = useState(searchParams.get('search'))
    
    const genreAdd = (genre) => {
        const genreParams = searchParams.get('genres')
        toggleGenre(genre)
        setSearchParams({ 'search' : searchParams.get('search') ? searchParams.get('search') : '', 'genres' : (genreParams ? genreParams + `/${genre}` : `/${genre}`) })
    }

    const genreRemove = (genre) => {
        const genreParams = searchParams.get('genres')
        const reg = new RegExp(`/${genre}`, 'i')
        toggleGenre(genre)
        setSearchParams({ 'search' : searchParams.get('search') ? searchParams.get('search') : '', 'genres' : genreParams.replace(reg, '') })
    }
    
    useEffect(() => {
        const genreParams = searchParams.get('genres')
        toggleGenre(genreParams && genreParams.split('/'))
    },[])

    useEffect(() => {
        if (input !== null) {
            setTitle(input)
            setSearchParams({ 'search' : input, 'genres' : searchParams.get('genres') ? searchParams.get('genres') : ''})
        }
    },[input])

    return (
    <div className='flex flex-row justify-between shrink p-1 mt-12 gap-4' style={{ position: 'sticky', top: '64px', left: '0px', backdropFilter: 'blur(16px) brightness(200%)', backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
        <div className='w-24'>
            <Dropdown className='rounded-full' label='Favorites' startIcon='❤️' endIcon='▼'>
                <div className='flex flex-col max-h-96 overflow-scroll'>
                    {user.user.favorites.length > 0 ? user.user.favorites.map((favorite, index) => (
                        <>
                            <div className='flex grow items-center gap-3'>
                                <div><div style={{ backgroundColor: 'cyan', width: '32px', height: '32px' }}></div></div>
                                <div className='grow'>
                                    <Typography sx={{ fontSize: '0.8em' }} variant='h3'>{favorite.title}</Typography>
                                    <Typography sx={{ fontSize: '0.7em' }}>{favorite.tagline.length > 100 ? `${favorite.tagline.substring(0, 100)}...` : favorite.tagline}</Typography>
                                </div>
                                <Button sx={{ margin: '0px', padding: '0px' }} onClick={() => {removeFavorite(favorite.id)}} variant='text'>❌</Button>
                            </div>
                            {(user.user.favorites.length > 1 && index !== user.user.favorites.length - 1) && <div style={{ height: '2px' }} className='grow bg-slate-200 rounded-full my-4'></div>}
                        </>
                    ))
                    :
                    <Typography>No Favorites yet.</Typography>
                    }
                </div>
            </Dropdown>
        </div>
        <div className='flex flex-row'>
            <input placeholder='Title' value={input} onChange={(e) => {setInput(e.target.value)}} type='text' style={{ backgroundColor: 'transparent', borderColor: theme.primary, borderWidth: '1px' }} className='pl-2 rounded-none rounded-l-full w-72' />
            <Dropdown className='rounded-none' label='Genre' startIcon='📚' endIcon='▼'>
                <div className='flex flex-col'>
                    {genresArr.map((genre) => (
                        <Button variant={genres.includes(genre) ? 'filled' : 'outlined'} sx={{ margin: '2px 0px' }} className='rounded-full' onClick={() => {!genres.includes(genre) ? genreAdd(genre) : genreRemove(genre)}}>
                            {genre}
                        </Button>
                    ))}
                </div>
            </Dropdown>
            <Dropdown className='rounded-none' label='Year' startIcon='📅' endIcon='▼'>
                <Multislider />
            </Dropdown>
            <Dropdown className='rounded-none' label='Rating' startIcon='⭐' endIcon='▼'>
                <Multislider />
            </Dropdown>
            <Button className='rounded-none rounded-r-full'>🔍</Button>
        </div>
    </div>
    )
}

export default Filters