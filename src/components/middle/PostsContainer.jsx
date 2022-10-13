import React, { useEffect } from 'react'
import Post from './Post'
import './postContainer.css'
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios'

import { useLocation } from 'react-router-dom'
import socket from '../../socket'
import BASE_URL from '../../baseUrl'
 

function PostsContainer() {
    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation().pathname.split('/').filter(element => element)
  
    // console.log('profile path', location);

    // const [posts, setPosts] = useState(null)
    const posts = useSelector( state => state.posts )
    const comments = useSelector( state => state.comments )
    const dispatch = useDispatch();

    const getPosts = async () => {
        try {

            const URL = location[0] === 'home' ? BASE_URL + 'posts' : BASE_URL + `posts/profile/${location[1]}`

            const res = await axios.get(URL) 

            dispatch({type:'posts/getPosts',payload:res.data.reverse()})
            // setPosts(res.data.reverse())

        } catch (err) {
            console.error('Error get all posts: ', err);
        }
    }

    useEffect(() => {
        // console.log('===posts:',posts);
        
        getPosts()
    }, [posts && posts.length, comments && comments.length,location[0],location[1]])

    useEffect(()=>{
        socket.on("getPosts",()=>{
            getPosts()
        })
        return () => {
            // socket = null
        }
    },[])

    return (
        posts && user
        &&
        <div className='postsContainer'>
            {
                // console.log('posts on 35:',posts[0])
                posts.map(p => 
                    // console.log('posts on 37 in map:',p)
                    <Post key={p._id} post={p} />
                )
            }


        </div>
    )
}

export default PostsContainer