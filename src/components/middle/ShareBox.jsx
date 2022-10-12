import React, { useState } from 'react'
import './shareBox.css'
import PetsIcon from '@mui/icons-material/Pets';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
const BASE_URL = 'http://localhost:3000/'

function ShareBox({commentMode}) {
    // console.log('Mode:',commentMode);
  
    
    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user.token
    const [message, setMessage] = useState('')
    const [result, setResult] = useState(null)

    const posts = useSelector(state => state.posts)
    const comments = useSelector(state => state.comments)

    const dispatch = useDispatch();

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        if (message.length < 1) {
            return
        }
        commentMode ? submitComment() : submitPost()
        setMessage('')
    }

    const submitPost = async () => {
        try {
            const res = await axios.post(BASE_URL + 'posts',
                { message },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            )
            console.log(res.data);
            dispatch({ type: 'posts/addNewPost', payload: res.data })
             

        } catch (err) {
            console.error('Error sumbit post:', err);
        }
    }

    const submitComment = async () => {
        try {
            const res = await axios.post(BASE_URL + 'comments',
                { message, postId:commentMode },
                {
                    headers: {
                        'Authorization': token
                    }
                }
            )
            console.log('new comment:',res.data);
            dispatch({ type: 'comments/addNewComment', payload: res.data })


        } catch (err) {
            console.error('Error sumbit post:', err);
        }
    }

    const conditionRender = () => commentMode ? 
    {
        ph:"What do you think?",
        btn:"Comment"
    }
    :
    {
        ph:"What's happening of your pet?",
        btn:"Share"
    }

    return (
        <div className='sharebox'>

            <img src={user.user.profilePicture} alt={user.user.name} />

            <form onSubmit={handleSumbit}>
                <input type="text" placeholder={conditionRender().ph} onChange={handleMessage} value={message}/>
                <button type="submit"><PetsIcon /> {conditionRender().btn} <PetsIcon /> </button>
            </form>

        </div>
    )
}

export default ShareBox