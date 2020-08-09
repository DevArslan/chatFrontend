import { Subject } from 'rxjs';
import axios from 'axios'
import BASE_URL from '../../../config'

const rooms = new Subject()
const users = new Subject()

function getRooms() {
    axios.get(BASE_URL + '/rooms').then((res)=>{
        console.log(res)
        rooms.next(res.data)
    })
}

export default {
    rooms,
    users,
    getRooms,
}