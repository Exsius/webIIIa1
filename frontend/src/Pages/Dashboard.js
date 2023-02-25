import { Header, Favorites, Filter, List } from '../Components'
import { useState, useEffect } from "react"

const Dashboard = () => {

    return(
        <div className='flex flex-col grow md:container md:mx-auto center'>
            <Filter />
            <div className='flex grow'>
                <List />
            </div>
        </div>
    )
}

export default Dashboard