import React from 'react';
import axios from 'axios'
import BASE_URL from '../../../config'
import socket from '../../../socket'
import RoomsService from '../shared/RoomsService'
import reducer from '../../../reducer'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import AuthorizationService from '../shared/AuthorizationService'
const styles = {
    wrapper: {
        overflow: 'hidden',
        display: 'flex',
        height: '75vh',
        width: '45%',
        margin: '4rem auto 0 auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
    },
    users: {
        background: '#F7F8FB',
        width: '45%',
        borderRight: '1px solid #ccc',
    },
    usersTitle: {
        fontWeight: 'bolder',
    },
    usersList: {
        listStyle: 'none',
        padding: '0',
        fontWeight: 'bold',
    },
    usersItem: {
        padding: '0.5rem',
        margin: '1rem auto 0 auto',
        boxShadow: '-0px 0px 5px 0px rgba(0,0,0,0.4)',
        borderRadius: '5px',
        width: '80%',
        backgroundColor: "white",
    },
    chatMessages: {
        height: '75%',
        marginTop: '1rem',
        overflowY: 'scroll',
    },
    chatForm: {
        marginTop: '1rem',
        height: '20%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    chatFormInput: {
        resize: 'none',
        margin: '0 auto',
        outline: 'none',
        border: '1px solid #ccc',
        width: '90%',
        borderRadius: '5px',
        fontSize: '1.2rem'
    },
    chatFormButton: {
        width: '30%',
        margin: '0.5rem auto'
    },
    message: {
        width: '90%',
        margin: '0.8rem auto',
    },
    messageText: {
        wordBreak: 'break-word',
        textAlign: 'left',
        padding: '0.5rem',
        borderRadius: '5px',
        border: '1px solid #673AB7',
    },
    messageInfo: {
        textAlign: 'left',
        fontSize: '0.7rem',

    },
    messageInfoUserName: {
        fontWeight: 'bold',
    }

}

export default function Rooms(props) {
    const history = useHistory()


    if (!sessionStorage.getItem('username')) {
        history.push('/auth')
    }

    const [state, dispatch] = React.useReducer(reducer, {
        users: [],
        joined: false,
        messages: [],
    })
    const [message, setMessage] = React.useState('')

    const messageScroll = React.useRef(null)

    React.useEffect(() => {
        socket.on('USERS', (data) => {
            dispatch({
                type: 'USERS',
                payload: data,
            })
        })
        socket.on('MESSAGES', (message) => {

            dispatch({
                type: 'NEW_MESSAGE',
                payload: message,
            })
        })
    }, [])

    React.useEffect(() => {
        messageScroll.current.scrollTo(0, 99999);
    }, [state.messages])

    function sendMessage() {
        if(message){
            const messageObject = {}

        messageObject.id = props.match.params.id
        messageObject.username = props.username
        messageObject.message = message
        messageObject.date = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

        socket.emit('POST_MESSAGE', messageObject)

        dispatch({
            type: 'NEW_MESSAGE',
            payload: messageObject,
        })

        setMessage('')
        }
    }

    function joinInRoom() {

        const roomId = props.match.params.id
        const roomObject = {}
        roomObject.id = roomId
        roomObject.username = props.username

        axios.get(BASE_URL + '/rooms/' + roomId)
            .then((data) => {
                socket.emit('JOIN', roomObject)
                console.log(data)
                if (data.data != 'New room') {
                    const users = data.data.users
                    console.log(users)
                    const usernames = []
                    usernames.push(roomObject.username)
                    users.forEach(user => {
                        usernames.push(Object.values(user))
                    });
                    dispatch({
                        type: 'USERS',
                        payload: usernames,
                    })
                    dispatch({
                        type: 'MESSAGES',
                        payload: data.data.messages,
                    })
                    console.log(data.data.messages)
                    console.log(state.messages)
                    // state.messages = data.data.messages
                } else {
                    let users = []
                    users.push(roomObject.username)
                    dispatch({
                        type: 'USERS',
                        payload: users,
                    })
                }

                
            })
    }


    if (state.joined == false) {
        joinInRoom()
        dispatch({
            type: 'JOINED',
            payload: true,
        })
    }



    function usersList(users) {
        return (
            users.map((user, index) => {
                return (<li className="users-item" key={index} style={styles.usersItem}>{Object.values(user)}</li>)
            })
        )
    }

    function messagesList(messages) {
        return (
            messages.map((message, index) => {
                return (
                    <div className="message" key={index} style={styles.message}>
                        <div className="message-text " style={styles.messageText}>{message.message}</div>
                        <div className="message-info" style={styles.messageInfo}>
                            <span style={styles.messageInfoUserName}>{message.username}</span>, {message.date}
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <div className="wrapper" style={styles.wrapper}>
            <div className="users" style={styles.users}>
                <p className="users-title" style={styles.usersTitle}>Пользователи ({state.users.length}):</p>
                <ul className="users-list" id='users-list' style={styles.usersList}>
                    {usersList(state.users)}
                </ul>
            </div>
            <div className="chat">
                <div className="chat-messages" style={styles.chatMessages} ref={messageScroll}>
                    {messagesList(state.messages)}
                </div>
                <div className="chat-form" style={styles.chatForm}>
                    <textarea name="" id="" cols="100" rows="3" style={styles.chatFormInput} value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
                    <Button variant="outlined" color="secondary" className="chatFormButton" style={styles.chatFormButton} onClick={sendMessage} >
                        Отправить
                </Button>
                </div>
            </div>
        </div>

    )




}