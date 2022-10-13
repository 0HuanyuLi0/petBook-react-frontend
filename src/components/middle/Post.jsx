import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './post.css'
import Comment from './Comment'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {useNavigate} from 'react-router-dom'

import { format } from 'timeago.js'
import { Menu, MenuItem } from "@mui/material"

import axios from 'axios'
import socket from '../../socket'
import BASE_URL from '../../baseUrl'


function Post({ post }) {
  
    const push = useNavigate()
    const comments = useSelector(state => state.comments)

    const dispatch = useDispatch();

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

            dispatch({ type: 'posts/deletePost', payload: res.data })
            // console.log(res.data);
            socket.emit('addPosts','addPosts')
        } catch (err) {
            console.error('Error delete the post', err);
        }
    }

    const handleLike = (e) => {
        submitLike()
        socket.emit('addPosts','addPosts')
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
            // console.log(res.data);

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

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxHeight: '90vh',
        overflowY: 'scroll',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: 10,
        boxShadow: 24,
        p: 4,
    };

    return (

        <div className="post">
            <img className='avatar' src={post.author.profilePicture} alt="" onClick={()=>push(`/profile/${post.author._id}`)}/>

            <div className='post-container'>
                <div className="title">

                    <strong>
                        {post.author.name}
                    </strong>
                    <em>
                        {format(post.createdAt)}
                    </em>

                    {
                        (user.user._id === post.author._id) &&
                        <>
                            <IconButton onClick={handleClick}>
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

                    <IconButton onClick={handleOpenModal}>
                        <ChatBubbleOutlineIcon />
                    </IconButton>

                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                    >
                        <Box sx={style}>
                            <Comment post={post} />
                        </Box>
                    </Modal>

                    <div>
                        {post.comments.length}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Post