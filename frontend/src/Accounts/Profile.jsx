import React from 'react';
import { Redirect } from 'react-router-dom';

export const Profile = props => {

    if(!sessionStorage.getItem("auth") || window.location.pathname !== `/profile/${sessionStorage.getItem("username")}`) {
        return (<Redirect to="/"/>);
    }

    return <>
        Here is a Profile
    </>

}

export default Profile;