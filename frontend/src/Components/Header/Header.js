import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../../Context/Theme.js'
import Button from '../Generic/Button.js'
import ProfileIcon from './ProfileIcon.js'
import { useUser } from '../../Context/User'
import Popover from '../Movie/Popover.js'
import Paper from '../Generic/Paper.js'
import Typography from '../Generic/Typography.js'

const Header = (props) => {

    const theme = useTheme()
    const navigate = useNavigate()

    const user = useUser()
    const { setTitle } = user
    const [popover, togglePopover] = useState(false)

    return (
        <>
            <div style={{ backgroundColor: theme.primary, position: 'sticky', top: '0px', left: '0px' }} className='border-gray-200 flex justify-between items-center px-8 h-16'>
                <Button onClick={() => {setTitle(''); navigate('/')}} sx={{ fontSize: '2em' }}>Movie Browser</Button>
                <button className='rounded-full bg-blue-50 h-8'>
                    <ProfileIcon onClick={() => {navigate('/about'); togglePopover(!popover)}} />
                </button>
            </div>
            <div>
                {props.children}
            </div>
            <Popover sx={{ zIndex: '1' }} visible={popover} onClose={() => {togglePopover(false)}}>
                <Paper sx={{ width: '25vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <Typography variant='h1'>
                        Created By,
                    </Typography>
                    <Typography variant='h1'>
                        Christopher Pravlik
                    </Typography>
                    <div className='flex gap-3'>
                        <Button className='rounded-full' variant='outlined' onClick={() => {window.location.href = 'https://github.com/Exsius'}}>
                            Github Profile
                        </Button>
                        <Button className='rounded-full' onClick={() => {window.location.href = 'https://github.com/Exsius/webIIIa1'}}>
                            Github Repo
                        </Button>
                    </div>
                    <Typography variant='h1'>
                        This project uses,
                    </Typography>
                    <div className='flex flex-col'>
                        <Typography variant='h2'>
                            ⚛️React
                        </Typography>
                        <Typography variant='h2'>
                            〰️Tailwind
                        </Typography>
                        <Typography sx={{ paddingLeft: '29px' }} variant='h2'>and...
                        </Typography>
                        <Typography variant='h2'>
                            🐳Docker
                        </Typography>
                    </div>
                </Paper>
            </Popover>
        </>
    )
}

export default Header