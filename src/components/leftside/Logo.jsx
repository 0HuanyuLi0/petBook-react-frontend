import React from 'react'
import PetsIcon from '@mui/icons-material/Pets';
import './logo.css'
import { useNavigate } from 'react-router-dom'

function Logo() {
    const push = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    const homePath = `/home/${user?.user._id}`

    return (
        <div className='logo' onClick={()=>push(homePath)}>
            <PetsIcon />
            <span>
                PetBook
            </span>
            <PetsIcon />
        </div>
    )
}

export default Logo