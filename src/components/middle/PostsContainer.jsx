import React, { useState, useEffect } from 'react'
import Post from './Post'
import './postContainer.css'

import axios from 'axios'

const BASE_URL = 'http://localhost:3000/'

function PostsContainer() {

    const [posts, setPosts] = useState(null)


    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(BASE_URL + 'posts')
                setPosts(res.data.reverse())
                // console.log(res.data);

            } catch (err) {
                console.error('Error get all posts: ', err);
            }
        }
        getPosts()
    }, [])


    return (
        posts &&
        <div className='postsContainer'>
            {

                posts.map(p => 
                    // console.log('posts:',post)
                    <Post key={p._id} post={p} />
                )
            }


        </div>
    )
}

export default PostsContainer