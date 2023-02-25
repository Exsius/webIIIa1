import { useSearchParams, useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Popover = (props) => {

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (props.visible === true) {
            navigate(`/movie/${id ? id : props.movieid}`)
        }
    },[props.visible])

    const close = (e) => {
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

    return (
        <div onClick={close} className='close-trigger justify-center items-center' style={{ display: props.visible ? 'flex' : 'none', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', height: '100vh', width: '100vw', top: '0px', left: '0px' }}>
            <div className="fade-in w-2/3 p-2 mt-1 bg-white border border-gray-200 rounded-md drop-shadow-2xl">
                {props.children}
            </div>
        </div>
    )
}

export default Popover