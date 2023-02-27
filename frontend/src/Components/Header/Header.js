import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../Context/Theme.js'
import Button from '../Generic/Button.js'
import ProfileIcon from './ProfileIcon.js'
import { useUser } from '../../Context/User'

const Header = (props) => {

    const theme = useTheme()
    const navigate = useNavigate()

    const user = useUser()
    const { setTitle } = user

    return (
        <>
            <div style={{ backgroundColor: theme.primary, position: 'sticky', top: '0px', left: '0px' }} className='border-gray-200 flex justify-between items-center px-8 h-16'>
                <Button onClick={() => {setTitle(''); navigate('/')}} sx={{ fontSize: '2em' }}>Movie Browser</Button>
                <button className='rounded-full bg-blue-50 h-8'>
                    <ProfileIcon />
                </button>
            </div>
            <div>
                {props.children}
            </div>
        </>
    )
}

export default Header