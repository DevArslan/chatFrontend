import React from 'react';
import axios from 'axios'
import BASE_URL from '../../../config'
import socket from '../../../socket'

const styles = {

}





export default function Rooms(props) {

    React.useEffect(() => {
        socket.on('USER JOINED', (users)=>{
            console.log('пользователи:',users)
        })
    })


    const roomId = props.match.params.id
    const roomObject = {}
    roomObject.id = roomId
    roomObject.username = props.username
    axios.post(BASE_URL + '/rooms', roomObject)
        .then(() => {
            socket.emit('JOIN', roomObject)
        })


    return (< h1 > ROOM {roomId}</h1 >)



}