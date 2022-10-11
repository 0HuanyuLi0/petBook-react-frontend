import React, { useState } from 'react'
import './shareBox.css'
import PetsIcon from '@mui/icons-material/Pets';
import axios from 'axios'
const BASE_URL = 'http://localhost:3000/'

function ShareBox() {

    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user.token
    const [message,setMessage] = useState(null)
    const [result,setResult] = useState(null)

    const handleMessage = (e)=> {
        setMessage(e.target.value)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        submitPost()
    }

    const submitPost = async() => {
        try{
            const res = await axios.post(BASE_URL + 'posts',
                {message},
                {headers:{
                    'Authorization':token
                }}
            )
            // console.log(res.data);

        }catch(err){
            console.error('Error sumbit post:',err);
        }
    }

    return (
        <div className='sharebox'>

            <img src={user.user.profilePicture} alt={user.user.name} />

            <form onSubmit={handleSumbit}>
                <input type="text" placeholder="What's happening of your pet?" onChange={handleMessage}/>
                <button type="submit"><PetsIcon /> Share <PetsIcon /> </button>
            </form>

        </div>
    )
}

export default ShareBox