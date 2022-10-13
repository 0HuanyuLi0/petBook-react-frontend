import React from 'react'
import './home.css'

import Logo from '../leftside/Logo'
import Profile from '../leftside/Profile'
import NavLinks from '../leftside/NavLinks'
import SearchBar from '../middle/SearchBar'
import ShareBox from '../middle/ShareBox'
import PostsContainer from '../middle/PostsContainer'
import Followers from '../rightside/Followers'
import { useLocation } from 'react-router-dom'
import FriendsController from '../profile/FriendsController'
import Messager from '../messager/MessagerContainer'


function Home() {

    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user.token

    const location = useLocation().pathname.split('/').filter(element => element)

    return (
        <div className="Home">

            <div className="left-side">
                <Logo />
                <Profile userId={user.user._id} />
                <NavLinks />
            </div>

            <div className="middle">
                {
                    location[0] === 'messager' &&
                    <Messager />
                }

                {
                    location[0] !== 'messager' &&
                    <>
                        <SearchBar />
                        {
                            location[0] === 'profile' &&
                            <Profile userId={location[1]} />
                        }
                        {
                            location[1] === user.user._id ?
                                <ShareBox commentMode={false} />
                                :
                                <FriendsController userId={location[1]} />
                        }
                        <PostsContainer />
                    </>
                }


            </div>

            <div className="right-side">
                <Followers />
            </div>

        </div>
    )
}

export default Home