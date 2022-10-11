import React from 'react'

import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FeedIcon from '@mui/icons-material/Feed';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import './navlinks.css'

import axios from 'axios'
const BASE_URL = 'http://localhost:3000/'


function NavLinks() {
    const push = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user.token

    const homePath = `/home/${user.user._id}`

    
    const logout = () => {
        localStorage.removeItem("user")
        push('/login')
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
           
                <Button size="large" startIcon={<HomeIcon />} href={homePath} style={{justifyContent: "flex-start"}}>
                    <span>Home</span> 
                </Button>

                <Button size="large" startIcon={<NotificationsIcon />} href="#" style={{justifyContent: "flex-start"}}>
                    Notification
                </Button>

                <Button size="large" startIcon={<FeedIcon />} href="#" style={{justifyContent: "flex-start"}}>
                    Feeds
                </Button>

                <Button size="large" className='logoutBtn' startIcon={<LogoutIcon />} onClick={logout} style={{justifyContent: "flex-start"}}>
                    Logout
                </Button>

                <Button size="large" className='deteleBtn' startIcon={<DeleteForeverIcon />} onClick={deleteAccount} style={{justifyContent: "flex-start"}}>
                    Delete Account
                </Button>

        </div>
    )
}

export default NavLinks