import React from 'react';


const styles = {

}

export default class Rooms extends React.Component {
    render() {
        console.log(this.props.match.params.id)
        return (
            <h1>Rooms</h1>
        )
    }

}