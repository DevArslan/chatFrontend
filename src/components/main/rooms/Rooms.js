import React from 'react';
import axios from 'axios'
import BASE_URL from '../../../config'

const styles = {

}





export default function Rooms(props) {


    const roomId = props.match.params.id
    const roomObject = {}
    roomObject.id = roomId
    roomObject.username = props.username
    axios.post(BASE_URL + '/rooms', roomObject)

    return (< h1 > Rooms</h1 >)



}