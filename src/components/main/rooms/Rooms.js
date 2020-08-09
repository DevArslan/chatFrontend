import React from 'react';
import axios from 'axios'
import BASE_URL from '../../../config'
import socket from '../../../socket'
import RoomsService from '../shared/RoomsService'
import reducer from '../../../reducer'
const styles = {
    wrapper: {
        overflow: 'hidden',
        display: 'flex',
        height: '50vh',
        width: '30%',
        margin: '4rem auto 0 auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
    },
    users: {
        background: '#F7F8FB',
        width: '35%',
        borderRight: '1px solid #ccc',
    }

}


export default function Rooms(props) {
    const [state, dispatch] = React.useReducer(reducer, {
        users: [],
        joined: false,
    })


    React.useEffect(() => {
        
        socket.on('USERS', (data) => {
            dispatch({
                type: 'USERS',
                payload: data,
            })
            console.log('пользователи:', data)
        })
        
    }, [])


    function joinInRoom() {
        
        const roomId = props.match.params.id
        const roomObject = {}
        roomObject.id = roomId
        roomObject.username = props.username
        axios.get(BASE_URL + '/rooms/'+roomId)
            .then((data) => {
                console.log(data)
                if(data.data != 'New room'){
                    const users = data.data.users
                    console.log(users)
                    const usernames = []
                    usernames.push(roomObject.username)
                    users.forEach(user => {
                        usernames.push(Object.values(user))
                    });
                    
                    console.log(data.data.users)
                    dispatch({
                        type: 'USERS',
                        payload: usernames,
                    })
                }else{
                    let users = []
                    users.push(roomObject.username)
                    dispatch({
                        type: 'USERS',
                        payload: users,
                    })
                }
               
                socket.emit('JOIN', roomObject)
            })
    }


    if(state.joined == false){
        joinInRoom()
        dispatch({
            type: 'JOINED',
            payload: true,
        })
    }



    function usersList(users) {
        return (
            users.map((user) => {
                console.log(user)
                return (<li>{Object.values(user)}</li>)
            })
        )
    }

    return (
        <div className="wrapper" style={styles.wrapper}>
            <div className="users" style={styles.users}>
                <p className="users-title">Пользователи:</p>
                <ul className="users-list" id='users-list'>
                    {usersList(state.users)}
                </ul>
            </div>
            <div className="chat"></div>
        </div>

    )




}