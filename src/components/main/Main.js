import Authorization from './authorization/Authorization';
import Rooms from './rooms/Rooms';
import React from 'react';
import axios from 'axios'
import RoomsService from './shared/RoomsService'
import BASE_URL from '../../config'
import AuthorizationService from './shared/AuthorizationService'
import {
    Route,
    Switch,
    Redirect,
    withRouter,
    useParams,
    useRouteMatch
} from "react-router-dom"

const styles = {

}

let username = ''


export default function Main(props) {
    let { path, url } = useRouteMatch();
    const { history } = props



    if(sessionStorage.getItem('username')){
        username = sessionStorage.getItem('username')
    }

    return (
        <div className='wrapper'>
            <Switch>
                <Route history={history} path={`${path}/auth/`} render={(props) => (<Authorization {...props} />)} />
                <Route history={history} path={`${path}/rooms/:id`}  render={(props) => (<Rooms {...props}  username = {username} />)} />
                <Redirect from={`${path}/**`} to={`${path}/auth`} />
            </Switch>

        </div>
    )



}