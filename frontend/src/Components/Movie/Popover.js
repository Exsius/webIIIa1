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
        if (props.movieid) {
            if (props.visible === true) {
                navigate(`/movie/${id ? id : props.movieid}`)
            }
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
        <div onClick={close} className='close-trigger fade-in justify-center items-center' style={{ display: props.visible ? 'flex' : 'none', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', height: '100vh', width: '100vw', top: '0px', left: '0px', ...props.sx }}>
            {props.children}
        </div>
    )
}

export default Popover