import React from 'react';
import { Redirect } from 'react-router-dom';

export const Profile = props => {

    if(!props.auth) {
        return (<Redirect to="/" push/>);
    }

    return <>
        Here is a Profile
    </>

}

export default Profile;