export default (state, action) => {
    switch (action.type) {
        case 'USERS':
            console.log(action.payload)
            return {
                ...state,
                users: action.payload
            }
        case 'JOINED':
            return {
                ...state,
                joined: action.payload
            }
        default:
            break;
    }


}