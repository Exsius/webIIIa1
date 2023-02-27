import Button from "../Components/Generic/Button"
import Paper from "../Components/Generic/Paper"
import Typography from "../Components/Generic/Typography"
import { useTheme } from "../Context/Theme"
import { useState, useEffect } from "react"
import { getHeroes } from "../Api/MovieAPI"
import { useNavigate } from "react-router-dom"

const Search = () => {

    const theme = useTheme()
    const navigate = useNavigate()

    const [heroes, setHeroes] = useState([])
    const [currHero, setCurrHero] = useState(1)
    const [heroBrightness, setHeroBrightness] = useState(1)
    const [input, setInput] = useState('')

    useEffect(() => {
        getHeroes('w780').then(res => {
            setHeroes(res)
        })
    },[])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (heroBrightness === 0) {
                setHeroBrightness(1)
            } else {
                setTimeout(() => {
                    setCurrHero(Math.floor(Math.random() * heroes.length))
                }, 600)
                setHeroBrightness(0)
            }
        }, heroBrightness === 1 ? 4000 : 600)
        return () => (clearTimeout(timeout))
    },[heroBrightness])

    return (
        <div className='flex flex-col grow'>
            <div style={{ position: 'fixed', width: '100vw', height: '100vh', backgroundColor: 'black', zIndex: '-1' }} />
            <div style={{ position: 'fixed', width: '100vw', height: '100vh', backgroundImage: `url(${heroes[currHero]?.url})`, backgroundSize: 'cover', transform: `scale(${heroBrightness === 1 ? 1 : 1.2})`, transition: 'all 0.6s', filter: `opacity(${heroBrightness}) blur(${heroBrightness === 1 ? 0 : 30}px)`, zIndex: '-1' }} />
            <div className='flex justify-center pt-56'>
                <Paper sx={{ height: '206px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <Typography variant='h1'>Movie Browser.</Typography>
                    <div className='flex'>
                        <input placeholder='Title' value={input} onChange={(e) => {setInput(e.target.value)}} onKeyPress={(e) => {e.key === 'Enter' && navigate('/movies')}} type='text' style={{ backgroundColor: 'transparent', borderColor: theme.primary, borderWidth: '1px' }} className='pl-2 rounded-none rounded-l-full w-72' />
                        <Button onClick={() => {navigate(`/movies?search=${encodeURIComponent(input)}`)}} className='rounded-none rounded-r-full'>🔍</Button>
                    </div>
                    <div className='flex'>
                        <Typography sx={{ paddingTop: '1px' }}>Cant think of a movie? Feel free to browse</Typography>
                        <Button onClick={() => {navigate('/movies')}} variant='text' sx={{ padding: '0px 0px 6px 2px' }}>here.</Button>
                        <div className='grow'></div>
                    </div>
                </Paper>
            </div>
            <div style={{ position: 'fixed', left: '0px', bottom: '0px' }}>
                <Typography variant='h2' sx={{ color: 'white', backgroundColor: 'black', padding: '4px 8px' }}>{heroes[currHero]?.title} image from tmdb.org</Typography>
            </div>
        </div>
    )
}

export default Search