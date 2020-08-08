import React from 'react';
import axios from 'axios'
import BASE_URL from '../../config'
import AuthorizationService from '../../shared/AuthorizationService'

const styles = {

}

export default class Rooms extends React.Component {

    render() {

        AuthorizationService.username.subscribe((data) => {
            const username = data
            console.log(username)
        })
        axios.post(BASE_URL + '/rooms', { roomId: this.props.match.params.id })



        return (
            <h1>Rooms</h1>
        )
    }

}