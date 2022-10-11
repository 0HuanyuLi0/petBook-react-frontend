import React from 'react'
import PetsIcon from '@mui/icons-material/Pets';
import './logo.css'

function Logo() {
    return (
        <div className='logo'>
            <PetsIcon />
            <span>
                PetBook
            </span>
            <PetsIcon />
        </div>
    )
}

export default Logo