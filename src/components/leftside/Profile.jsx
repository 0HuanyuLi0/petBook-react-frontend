import React, { useEffect, useState } from 'react'
import './profile.css'
import Avatar from '@mui/material/Avatar';
import {useNavigate} from 'react-router-dom'

import axios from 'axios'
let BASE_URL;
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000/';
} else {
    BASE_URL = 'https://petbook-server-huanyuli.herokuapp.com/';
}

function Profile({userId}) {

    console.log('profile image',userId);
    const user = JSON.parse(localStorage.getItem('user'));
    const push = useNavigate()

    const [url,setUrl] = useState(null)
    const [userName,setUserName] = useState(null)

    useEffect(()=>{
        const getImage = async()=>{
            try{
                const res = await axios.get(BASE_URL + `user/image/${userId}`)
                setUrl(res.data.profilePicture)
                setUserName(res.data.name)
                // console.log('profile image data',res.data);
    
            }catch(err){
                console.error('Error get profile image',err);
            }
        }
        getImage()
    },[userId&&userId])

  return (
    url &&
    <div className="profile" onClick={()=>push(`/profile/${userId}`)}>
        <img src={url} alt="profile" />
        <h3>{userName}</h3>
    </div>
  )
}

export default Profile