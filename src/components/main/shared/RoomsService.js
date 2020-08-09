import { Subject } from 'rxjs';
import axios from 'axios'
import BASE_URL from '../../../config'

const rooms = new Subject()

function getRooms() {
    axios.get(BASE_URL + '/rooms').then((res)=>{
        rooms.next(res.data)
    })
}

export default {
    rooms,
    getRooms,
}