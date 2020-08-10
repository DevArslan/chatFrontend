import { Subject } from 'rxjs';

const username = new Subject()
const IsAuthenticated = new Subject(false)

export default {
    username,
    IsAuthenticated,
}