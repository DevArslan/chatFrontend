import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';
import axios from 'axios'
import socket from '../../socket'
import BASE_URL from '../../config'
import Rooms from '../rooms/Rooms'
import AuthorizationService from '../../shared/AuthorizationService'
import RoomsService from "../../shared/RoomsService";
import { useHistory } from "react-router-dom";


const styles = {
    snackbar: {
        backgroundColor: '#f44336',
    },
    authForm: {
        marginTop: '35vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputLogin: {

    },
    authButton: {
        display: 'block',
        marginTop: '1rem'
    }
}

export default function AuthForm(props) {
    // console.log(props.rooms)
    // const rooms = props.rooms

    const history = useHistory()
    let [rooms, setRooms] = React.useState([])
    const [userName, setUserName] = React.useState('')
    const [open, setOpen] = React.useState(false);

    RoomsService.rooms.subscribe((data) => {
        setRooms(data)
        console.log(data)
    })





    const snackOpen = () => {
        setOpen(true);
    };

    const snackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function auth() {

        if (!userName) {
            snackOpen()
        } else {
            AuthorizationService.username.next(userName)
            console.log(rooms)
            const roomsIds = Object.keys(rooms).sort()
            console.log(roomsIds)
            if (roomsIds.length == 0) {
                history.push('/rooms/1')
            } else {
                console.log(Number(roomsIds[roomsIds.length-1]))
                history.push(`/rooms/${Number(roomsIds[roomsIds.length-1]) + 1}`)
            }

        }
    }

    return (
        <div>
            <form action="" className="authForm" style={styles.authForm}>
                <TextField className="inputLogin" id="standard-basic" label="Имя пользователя" value={userName} onChange={(event) => setUserName(event.target.value)} />
                <Button variant="outlined" color="secondary" className="authButton" style={styles.authButton} onClick={auth}>
                    Войти
                </Button>
            </form>
            <Snackbar


                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={snackClose}>
                <SnackbarContent className="snackbar" style={styles.snackbar}
                    message="Пожалуйста, введите имя пользователя"
                />

            </Snackbar>
        </div>

    )
}