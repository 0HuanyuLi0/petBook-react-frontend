import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

import './searchBar.css'

function SearchBar() {
  return (
    <div className='search-bar'>
       
            <SearchIcon className='search-icon'/>
            <input type="text" placeholder="Search for Users or Posts"/>
       
    </div>
  )
}

export default SearchBar