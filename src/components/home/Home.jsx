import React from 'react'
import './home.css'

import Logo from '../leftside/Logo'
import Profile from '../leftside/Profile'
import NavLinks from '../leftside/NavLinks'
import SearchBar from '../middle/SearchBar'
import ShareBox from '../middle/ShareBox'
import PostsContainer from '../middle/PostsContainer'
import Following from '../rightside/Followers'
import Followers from '../rightside/Followers'

function Home() {
  return (
    <div className="Home">

      <div className="left-side">
        <Logo />
        <Profile/>
        <NavLinks />
      </div>

      <div className="middle">
        <SearchBar />
        <ShareBox commentMode = {false}/>
        <PostsContainer />
      </div>

      <div className="right-side">
        <h3>Friends and Chat</h3>
        <Following />
        <Followers />
      </div>

    </div>
  )
}

export default Home