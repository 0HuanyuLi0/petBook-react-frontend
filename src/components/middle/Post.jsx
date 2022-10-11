import React, { useState, useEffect } from 'react'
import './post.css'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { format } from 'timeago.js'
import { Menu, MenuItem } from "@mui/material"

import axios from 'axios'
const BASE_URL = 'http://localhost:3000/'

function Post({ post }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user.token

    const [like, setLike] = useState(post.likes.includes(user.user._id))
    const [likeNumb, setLikeNumb] = useState(post.likes.length)

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setAnchorEl(null)
        setOpen(false)
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpen(true)
    }

    const handleDelete = async () => {
        try {
           
            const res = await axios.delete(BASE_URL + `post/${post._id}`, {
                headers: {
                    'Authorization': token
                }
            })

            handleClose()
           
            console.log(res.data);

        } catch (err) {
            console.error('Error delete the post', err);
        }
    }

    const handleLike = (e) => {
        submitLike()
    }

    const submitLike = async () => {
        try {
            
            const res = await axios.post(BASE_URL + `like/${post._id}`, {}, {
                headers: {
                    'Authorization': token
                }
            })
            setLike(res.data.liked)
            setLikeNumb(res.data.number)
            console.log(res.data);

        } catch (err) {
            console.error('Error submit like', err);
        }
    }

    const likeIcon = () => {
        if (!like) {
            return <FavoriteBorderIcon />
        } else {
            return <FavoriteIcon />
        }
    }

    return (

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
                    <IconButton onClick={handleClick}>
                        <MoreHorizIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                </div>

                <div className="content">
                    <p>{post.message}</p>
                    <img src={post.img_url} alt="" />
                </div>

                <div className="bottom">

                    <IconButton onClick={handleLike}>
                        {likeIcon()}
                    </IconButton>

                    <div>
                        {likeNumb}
                    </div>

                    <IconButton>
                        <ChatBubbleOutlineIcon />
                    </IconButton>

                    <div>
                        {post.comments.length}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Post