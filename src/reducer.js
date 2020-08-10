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
        case 'MESSAGES':
            console.log('MESSAGES')
            return {
                ...state,
                messages: action.payload,
            }
        case 'NEW_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }
        default:
            break;
    }


}