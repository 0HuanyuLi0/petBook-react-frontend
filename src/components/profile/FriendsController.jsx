import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { pink } from '@mui/material/colors';
import './friendsController.css'
import { useSelector, useDispatch } from 'react-redux';


import axios from 'axios'


function FriendsController({ userId }) {
    let BASE_URL;
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000/';
} else {
    BASE_URL = 'https://petbook-server-huanyuli.herokuapp.com/';
}

    const friends = useSelector(state => state.friends)
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));

    const handleAdd = async () => {
        try {
            const res = await axios.post(BASE_URL + `follow/${userId}`,
                {
                    currentUserId : user.user._id
                })

            dispatch({ type: 'friends/addNewFriends'})

            console.log('add friend:', res.data);

        } catch (err) {
            console.error(err);
        }
    }

    // friends/getFriends

    const handleRemove = async () => {
        try {
            const res = await axios.post(BASE_URL + `unfollow/${userId}`,
                {
                    currentUserId : user.user._id
                })
                dispatch({ type: 'friends/deleteFriends'})
            console.log('remove friend:', res.data);

        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className='friends-controller'>

            <IconButton onClick={handleAdd}>
                <AddCircleIcon color="primary" sx={{ fontSize: 40 }} />
            </IconButton>

            <IconButton onClick={handleRemove}>
                <RemoveCircleIcon sx={{ color: pink[500], fontSize: 40 }} />
            </IconButton>
        </div>


    )
}

export default FriendsController