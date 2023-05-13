import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import BASE_URL from '../../baseUrl';
import Modal from '@mui/material/Modal';
import './searchBar.css'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import Post from './Post';


function SearchBar() {

  const [text, setText] = useState('')
  const [results, setResults] = useState(null)
  const [open, setOpen] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setText('') }

  const push = useNavigate()

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


  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(text);
    getResults()

  }


  const getResults = async () => {
    const res = await axios.post(BASE_URL + `search`, { text })

    console.log('res->', res.data);

    handleOpen()

    if (res.data.length > 0) {
      setResults(res.data)
    } else {
      setResults('NO RESULTS')
    }
  }

  const ResultsShow = () => {
    if (results === 'NO RESULTS') {
      return <strong className='noR'>Sorry, {results}</strong>
    }

    return results?.map(r => {
      if (r.name) {

        return <>
        <div key={r._id} className='user' onClick={() => { push(`/profile/${r._id}`); handleClose() }}>
          <img src={r.profilePicture} alt={r.name} />
          <p>{r.name}</p>
        </div>
        </>
      } else {
        return <Post post={r} />
      }
    })
  }


  return (

    <>
      <div className='search-bar'>
        <SearchIcon className='search-icon' onClick={handleSubmit} />
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search for Users or Posts" onChange={(e) => setText(e.target.value)} value={text} />
        </form>
      </div>

      {results?.length > 0 && 
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <ResultsShow />
        </Box>
      </Modal>}
    </>
  )
}

export default SearchBar