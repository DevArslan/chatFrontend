import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';
import axios from 'axios'
import socket from '../../socket'
import BASE_URL from '../../config'
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

export default function AuthForm() {

    const [userName, setUserName] = React.useState('')
    const [open, setOpen] = React.useState(false);

    const snackOpen = () => {
        setOpen(true);
    };

    const snackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const auth = () => {
        if (!userName) {
            snackOpen()
        }
        console.log(BASE_URL)
        axios.post(BASE_URL+'/rooms',{userName})
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