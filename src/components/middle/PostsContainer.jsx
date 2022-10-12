import React, { useEffect } from 'react'
import Post from './Post'
import './postContainer.css'
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/'

function PostsContainer() {

    // const [posts, setPosts] = useState(null)
    const posts = useSelector( state => state.posts )
    const comments = useSelector( state => state.comments )
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('===posts:',posts);
        const getPosts = async () => {
            try {
                const res = await axios.get(BASE_URL + 'posts')
                dispatch({type:'posts/getPosts',payload:res.data.reverse()})
                // setPosts(res.data.reverse())

            } catch (err) {
                console.error('Error get all posts: ', err);
            }
        }
        getPosts()
    }, [posts && posts.length, comments && comments.length])


    return (
        posts
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