import React, { useRef } from 'react'
import './message.css'
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client'

const BASE_URL = 'http://localhost:3000/'
// const SOCKET_URL = 'http://localhost:3008/'

const socket = io(BASE_URL)
socket.on("connect", () => {
    console.log('You connected with id: ' + socket.id);
}
)

socket.emit('custom-event','dadadadada...')


function Message() {

    // const scrollRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
    }




    return (
        <div className="message">


            <div className="message-block">
                <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" alt="a" />

                <div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <em>1 hour ago</em>
                </div>
            </div>

            <div className="message-block">

                <div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <em>1 hour ago</em>
                </div>

                <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" alt="a" />

            </div>

            <div className="message-block">

                <div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <em>1 hour ago</em>
                </div>

                <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" alt="a" />

            </div>

            <div className="message-block">

                <div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <em>1 hour ago</em>
                </div>

                <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" alt="a" />

            </div>

            <div className="message-block">

                <div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <em>1 hour ago</em>
                </div>

                <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" alt="a" />

            </div>

            <div className="message-block">

                <div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <em>1 hour ago</em>
                </div>

                <img src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" alt="a" />

            </div>

            <form className="inputs" onSubmit={handleSubmit}>
                <textarea placeholder="send something..." rows={3}></textarea>
                <br />
                <button type='submit'><SendIcon /></button>
            </form>

        </div>
    )
}

export default Message