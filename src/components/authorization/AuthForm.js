import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const styles = {
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
    return (
        <form action="" className= "authForm" style={styles.authForm}>
            <TextField className="inputLogin" id="standard-basic" label="Имя пользователя" />
            <Button variant="outlined" color="secondary" className = "authButton" style={styles.authButton}>
                Войти
            </Button>
        </form>

    )
}