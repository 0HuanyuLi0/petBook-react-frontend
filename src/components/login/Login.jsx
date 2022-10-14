import React, { useState } from 'react'
import Logo from '../leftside/Logo'
import './login.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import BASE_URL from '../../baseUrl'



function Login() {

    const [result,setResult] = useState(null)
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)

    const push = useNavigate()

    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        // console.log(email,password);
        loginTo()
        
    }

    const loginTo = async() => {
        try{
            const res = await axios.post(BASE_URL + 'login' , {
                email,
                password
            })

            setResult(res.data)

            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
                push(`/home/${res.data.user._id}`)
            }

            // console.log(res.data);

        }catch(err){
            console.error('Error login:',err);
        }
    }

    const Message = () => {
        return typeof(result) === 'string' && <p className='message'>{result}, please try again!</p> 
    }


    return (
        <div className='login'>
            <Logo />
            <img src="https://www.fetchpetcare.com/wp-content/uploads/2016/11/dreamstime_xxl_87694876-1024x293.jpg" alt="" className='long-img' />


            <form onSubmit={handleSumbit}>
                <TextField
                    required
                    
                    label="Email"
                    type="email"
                    className='text-field'
                    onChange={handleEmail}
                />

                <TextField
                    required
                    
                    label="Password"
                    type="password"
                    className='text-field'
                    onChange={handlePassword}
                    
                />

                <div className="btn">
                    <Button variant="contained" className='login-button' type='submit'> <PetsIcon /> Login <PetsIcon /></Button>
                </div>

            </form>

           
            <Button className='register-button' onClick={()=>{push('/register')}}>No Account? Register Now</Button>


            <Message />

        </div>
    )
}

export default Login