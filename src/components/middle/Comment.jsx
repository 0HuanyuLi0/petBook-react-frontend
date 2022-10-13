import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './post.css'
import { format } from 'timeago.js'
import axios from 'axios'
import ShareBox from './ShareBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from "@mui/material"

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000/';
} else {
    BASE_URL = 'https://petbook-server-huanyuli.herokuapp.com/';
}


function Comment({ post }) {

    const comments = useSelector(state => state.comments)
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user.token

    

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const [openElem, setOpenElem] = useState(null);

    const handleClose = () => {
        setAnchorEl(null)
        setOpen(false)
    }

 

    const handleClick = (e,id) => {
        // console.log('anchor:',e.currentTarget,id);
        setOpenElem(id)
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }

    const handleDelete = async () => {
        // console.log('deleteing...:', id);
        // console.log(e.currentTarget);
        try {

            const res = await axios.delete(BASE_URL + `comment/${openElem}`, {
                headers: {
                    'Authorization': token
                }
            })

            handleClose()

            dispatch({ type: 'comments/deleteComment', payload: res.data })
            console.log(res.data);

        } catch (err) {
            console.error('Error delete the post', err);
        }
    }


    useEffect(() => {
        console.log('comments', comments);
        const getComments = async () => {
            try {
                const res = await axios.get(BASE_URL + `post/${post._id}/comments`)
                console.log('get comments', res.data);

                dispatch({ type: 'comments/getComments', payload: res.data.reverse() })

            } catch (err) {
                console.error('Error get comments', err);
            }
        }
        getComments()
    }, [comments && comments.length])


    return (
        comments
        &&
        <div className="post">
            <img className='avatar' src={post.author.profilePicture} alt="" />

            <div className='post-container'>
                <div className="title">

                    <strong>
                        {post.author.name}
                    </strong>
                    <em>
                        {format(post.createdAt)}
                    </em>


                </div>

                <div className="content">
                    <p>{post.message}</p>
                    <img src={post.img_url} alt="" />
                </div>

                <ShareBox commentMode={post._id} />

                {
                    comments.map(c => <div key={c._id} className='post'>

                        <img className='avatar' src={c.author.profilePicture} alt="" />
                        <div className='post-container'>
                            <div className="title">

                                <strong>
                                    {c.author.name}
                                </strong>
                                <em>
                                    {format(c.createdAt)}
                                </em>

                                {
                                    (user.user._id === c.author._id) &&
                                    <>
                                        <IconButton onClick={(e)=>handleClick(e,c._id)}>
                                            <MoreHorizIcon />
                                        </IconButton>

                                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                            <MenuItem onClick={handleClose}>Edit</MenuItem>

                                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                        </Menu>
                                    </>
                                }


                            </div>

                            <div className="content">
                                <p>{c.message}</p>
                                <img src={c.img_url} alt="" />
                            </div>
                        </div>

                    </div>)
                }
            </div>



        </div>

    )
}

export default Comment