import { useSearchParams, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from "../Generic/Button"
import { useTheme } from "../../Context/Theme"
import { useUser } from "../../Context/User"

const Popover = (props) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const theme = useTheme()
    const user = useUser()

    const { toggleFavorite } = user

    useEffect(() => {
        if (props.visible === true) {
            navigate(`/movie/${id ? id : props.movieid}`)
        }
    },[props.visible])

    const close = (e) => {
        if (e.target) {
            const { classList } = e.target
            if (classList.contains('close-trigger')) {
                const closes = document.querySelectorAll('.close-trigger')
                closes.forEach((el) => el.classList.add('fade-out'))
                setTimeout(() => {
                    closes.forEach((el) => el.classList.remove('fade-out'))
                    id && navigate('/movies')
                    props.onClose()
                }, 200)
            }
        }
    }

    return (
        <div onClick={close} className='close-trigger justify-center items-center' style={{ display: props.visible ? 'flex' : 'none', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', height: '100vh', width: '100vw', top: '0px', left: '0px' }}>
            <div className="fade-in w-2/3 h-2/3 mt-1 bg-white border border-gray-200 rounded-md drop-shadow-2xl" style={{ backgroundImage: `url(${props.backdropLink})`, backgroundSize: 'cover' }}>
                <div className="fade-in w-full h-full p-2 rounded-md" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.84) 24%, rgba(255,255,255,0.92) 25%, rgba(255,255,255,1) 100%)' }}>
                    <div className='flex justify-between'>
                        <Button variant={user.user.favorites.some(fav => fav.id === props.movieid) ? 'filled' : 'outlined'} className='rounded-full' onClick={() => {toggleFavorite(props.movieid)}}>❤️</Button>
                        <Button className='rounded-full close-trigger' sx={{ backgroundColor: 'white', color: theme.primary }} onClick={close}>X</Button>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Popover