import { io } from 'socket.io-client'

import BASE_URL from './baseUrl'

let socket = null
if (socket === null) {
    socket = io(BASE_URL)
}

export default socket


