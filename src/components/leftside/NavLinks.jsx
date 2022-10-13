import React from 'react'

import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FeedIcon from '@mui/icons-material/Feed';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom'
import './navlinks.css'

import axios from 'axios'
let BASE_URL;
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000/';
} else {
    BASE_URL = 'https://petbook-server-huanyuli.herokuapp.com/';
}


function NavLinks() {
    const push = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user.token

    const homePath = `/home/${user.user._id}`
    const profilePath = `/profile/${user.user._id}`
    const messagerPath = `/messager/${user.user._id}`

    
    const logout = () => {
        localStorage.removeItem("user")
        push('/')
    }

    const deleteAccount = async() => {
        const res = await axios.delete(BASE_URL + `user/${user.user._id}`,{
            headers: {
                'Authorization': token
            }
        })
        localStorage.removeItem("user")
        console.log(res.data);
        push('/login')
    }

    return (
        <div className="nav-links">
           
                <Button size="large" startIcon={<HomeIcon />} onClick={()=>{push(homePath)}}  style={{justifyContent: "flex-start"}}>
                    <span>Home</span> 
                </Button>

                <Button size="large" startIcon={<NotificationsIcon />}  style={{justifyContent: "flex-start"}}>
                    Notification
                </Button>

                <Button size="large" startIcon={<FeedIcon />} onClick={()=>{push(profilePath)}} style={{justifyContent: "flex-start"}}>
                    Feeds
                </Button>

                <Button size="large" startIcon={<ChatIcon />} onClick={()=>{push(messagerPath)}} style={{justifyContent: "flex-start"}}>
                    Messager
                </Button>

                <Button size="large" className='logoutBtn' startIcon={<LogoutIcon />} onClick={logout} style={{justifyContent: "flex-start"}}>
                    Logout
                </Button>

                <Button size="large" className='deteleBtn' startIcon={<DeleteForeverIcon />} onClick={deleteAccount} style={{justifyContent: "flex-start"}}>
                    Delete
                </Button>

        </div>
    )
}

export default NavLinks