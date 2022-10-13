import React, { useEffect, useRef, useState } from 'react'
import './messager.css'
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client'
import axios from 'axios'
import { format } from 'timeago.js'

let BASE_URL;
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000/';
} else {
    BASE_URL = 'https://petbook-server-huanyuli.herokuapp.com/';
}

function Message() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + user?.token
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState(null)
    let socket = io(BASE_URL)
    

    // useEffect(() => {
    //     console.log('======');
    //     socket.on('getUsers', users => {
    //         console.log('getUsers', users);
    //     })
    // }, [])

    useEffect(() => {
        
        socket.emit('addUser', user.user._id)
        console.log('addUser', user.user._id);
        return () => {
            socket = null
            // socket.off('connect')
            // socket.emit('goTodisconnect');
        }
    }, [user?.user._id])

    useEffect(() => {
        socket.on("getMessage", data => {
            getMessages()
        })
    }, [])


    const getMessages = async () => {
        try {
            const res = await axios.get(BASE_URL + `messages/publicRoom`)
            setMessages(res.data)



        } catch (err) {
            console.error('Error get messages', err);
        }
    }

    // const scrollRef = useRef()

    useEffect(() => {
        getMessages()
    }, [messages?.length])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage.length < 1) {
            return
        }
        try {
            const res = await axios.post(BASE_URL + `messages/${user.user._id}`, {
                // receiver:'',
                message: newMessage,
                chatRoom: 'publicRoom'
                // chatRoom:`${user.user._id}${receiver.id}`
            })
            console.log('=====new message', res.data);

            socket.emit('sendMessage', {
                senderId: user.user._id,
                text: newMessage
            })

            setMessages([res.data, ...messages])

            setNewMessage('')
        } catch (err) {
            console.error(err);
        }

    }





    return (

        <>
            {user.user._id && messages &&
                <div className="message">

                    {
                        messages.map(m =>
                            // console.log('m:====',m))
                            // <div key={m._id} className='message-block own'>

                            <div key={m._id} className={user.user._id === m.sender?._id ? 'message-block own' : 'message-block'}>

                                <img src={m.sender?.profilePicture} alt={m.sender?.name} />

                                <div className='textContainer'>
                                    <p>{m.message}</p>
                                    <em>{format(m.createdAt)}</em>
                                </div>
                            </div>)

                    }

                </div>}


            <form className="inputs" onSubmit={handleSubmit}>
                <textarea id='msg' placeholder="send something here..." onChange={(e) => { setNewMessage(e.target.value) }} value={newMessage}></textarea>
                <button type='submit'><SendIcon /></button>
            </form>
        </>


    )
}

export default Message