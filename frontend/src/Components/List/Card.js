import Paper from "../Generic/Paper"
import Rating from "../Generic/Rating"
import Typography from "../Generic/Typography"
import Button from "../Generic/Button"
import { useTheme } from "../../Context/Theme"
import { useUser } from "../../Context/User"
import { useState } from "react"

const Card = (props) => {

    const { image, title, rating, popularity, caption, subtitle, summary, children, onFavorite, onView, id } = props

    const theme = useTheme()
    const user = useUser()

    return (
        <Paper sx={{ padding: '0px', overflow: 'hidden', width: '292px', display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '372px' }}>
             {image && <div style={{ backgroundimage: `url('${image}')`, backgroundColor: 'cyan'}} className='h-72 p-0'>

             </div>}
             <div className='p-4 flex grow flex-col'>
                <div className='flex justify-between w-full items-end'>
                    <div className='grow'>
                        <div className='flex grow items-end justify-between'>
                            {title && <div>
                                <Typography variant='h1'>
                                    {title}
                                </Typography>
                            </div>}
                            {caption && <div>
                                <Typography variant='h3'>
                                    {caption}
                                </Typography>
                            </div>}
                        </div>
                        {subtitle && <div>
                            <Typography variant='subtitle'>
                                {subtitle.map((sub, index) => (
                                    sub && `${index !== 0 ? ' / ' : ''}${sub}`
                                ))}
                            </Typography>
                        </div>}
                    </div>
                </div>
                <div className='grow'>
                    {children}
                </div>
                <div className='flex justify-between'>
                    <div className='flex py-3'>
                        <Button variant={user.user.favorites.some(fav => fav.id === id) ? 'filled' : 'outlined'} className='rounded-none rounded-l-full' onClick={onFavorite}>❤️</Button>
                        <Button className='rounded-none rounded-r-full' onClick={onView}>View</Button>
                    </div>
                    <div className='flex flex-col'>
                        {rating && <div>
                            <Rating disabled rate={rating} />
                        </div>}
                        {popularity && <div>
                            <Typography sx={{ color: theme.primary }} variant='h3'>
                                🍿 #{popularity}
                            </Typography>
                        </div>}
                    </div>
                </div>
             </div>
        </Paper>
    )
}

export default Card