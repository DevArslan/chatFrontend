import React from 'react';
import AuthForm from './AuthForm';
import axios from 'axios'
import BASE_URL from '../../config'
import RoomsService from "../../shared/RoomsService";

const styles = {

}

export default function Authorization() {


    RoomsService.getRooms()

    return (
        <AuthForm ></AuthForm>
    )
}