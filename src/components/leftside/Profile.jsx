import React from 'react'
import './profile.css'
import Avatar from '@mui/material/Avatar';



function Profile() {
    const user = JSON.parse(localStorage.getItem('user'));

    
  return (
    <div className="profile">
        <img src={user.user.profilePicture} alt="profile" />
    </div>
  )
}

export default Profile