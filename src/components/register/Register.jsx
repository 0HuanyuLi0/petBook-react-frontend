import React, { useState } from 'react'
import Logo from '../leftside/Logo'
import './register.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import socket from '../../socket'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CloudinaryUploadWidget from '../CloudinaryUploadWidget';

import BASE_URL from '../../baseUrl'

function Register() {

    const [result, setResult] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [userName, setUserName] = useState(null)
    const [uploadUrl, setUploadUrl] = useState(null)

    const push = useNavigate()

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        // console.log(email,password);
        register()

    }

    const register = async () => {
        try {
            const res = await axios.post(BASE_URL + 'users', {
                name: userName,
                email,
                password,
                uploadUrl
            })

            setResult(res.data)

            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
                push(`/home/${res.data.user._id}`)
            }

            socket.emit('addNewUser', 'addNewUser')
            // console.log(res.data);

        } catch (err) {
            console.error('Error login:', err);
        }
    }



    return (
        <div className='register'>
            <Logo />
            <img src="https://www.fetchpetcare.com/wp-content/uploads/2016/11/dreamstime_xxl_87694876-1024x293.jpg" alt="" className='long-img' />


            <div className='form'>
                <TextField
                    required

                    label="Email"
                    type="email"
                    className='text-field'
                    inputProps={{
                        minLength: 3,
                    }}
                    onChange={handleEmail}
                />

                <TextField
                    required

                    label="Password"
                    type="password"
                    className='text-field'
                    inputProps={{
                        minLength: 6,
                    }}
                    onChange={handlePassword}
                />

                <TextField
                    required

                    label="Name"
                    type="text"
                    className='text-field'
                    onChange={handleUserName}
                />

                    <div className='upload'>

                {
                    !uploadUrl ?
                    <>
                    <CloudinaryUploadWidget url={(u) => {setUploadUrl(u)}} />
                    <em>Upload your profile image</em>
                    </>
                    :
                    <img className='upload-img' src={uploadUrl} alt={uploadUrl} />
                }
                </div>

                <div className="btn">
                    <Button
                        variant="contained"
                        className='register-button'
                        type='submit'
                        onClick={handleSumbit}>

                        <PetsIcon /> Register <PetsIcon />
                    </Button>
                </div>



            </div>

            <Button className='login-button' href='/login'>Already have an account? Login Here</Button>

        </div>
    )
}

export default Register