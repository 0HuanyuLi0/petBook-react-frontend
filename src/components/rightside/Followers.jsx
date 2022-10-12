import React, { useEffect, useState} from 'react'
import './following.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

const BASE_URL = 'http://localhost:3000/'

function Followers() {
    const friends = useSelector(state => state.friends)
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user.token
    const push = useNavigate()

    const [following, setFollowing] = useState(null)
    const [followers, setFollowers] = useState(null)


    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get(BASE_URL + `user/${user.user._id}/friends`, {
                    headers: {
                        'Authorization': token
                    }
                })

                setFollowing(res.data.following)
                setFollowers(res.data.followers)

                dispatch({ type: 'friends/getFriends', payload:(res.data.following.length + res.data.followers.length)})

            } catch (err) {
                console.error('Error get friends', err);
            }

        }
        getFriends()
    }, [friends])




    return (
        following && followers &&
        <div className='following'>
            <h3>You're following ...</h3>
            <ul>
                {
                    following.map(f =>
                        <li key={f._id} onClick={()=>push(`/profile/${f._id}`)}>
                            <img src={f.profilePicture} alt={f.profilePicture} />
                            <p>{f.name}</p>
                        </li>
                    )
                }
            </ul>

            <h3>You're followed by ...</h3>
            <ul>
                {
                    followers.map(f =>
                        <li key={f._id} onClick={()=>push(`/profile/${f._id}`)}>
                            <img src={f.profilePicture} alt={f.profilePicture} />
                            <p>{f.name}</p>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Followers