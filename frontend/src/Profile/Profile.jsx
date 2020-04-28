import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import profileDefault from '../profileDefault.jpg';

export const Profile = props => {

    if(!sessionStorage.getItem("auth") || window.location.pathname !== `/${sessionStorage.getItem("username")}`) {
        return (<Redirect to="/"/>);
    }

    let account = JSON.parse(sessionStorage.getItem('account'));
    

    return <>
        <div className="row d-flex justify-content-center">
            <div className="col-md-4 m-1">
                <Image src = {profileDefault} alt="Profile Pic" rounded></Image>
            </div>
            <div className="col-md-7 card">
                <h2 className="card-header">{account.firstName} {account.lastName}</h2>
                <div className="card-body">
                    <Link to={window.location.pathname + `/likes`}><h4>Likes({props.likes.length})</h4></Link>
                    <Link to={window.location.pathname + `/likes`}><h4>Dislikes({props.dislikes.length})</h4></Link>
                    <Link to={window.location.pathname + `/saved`}><h4>Saved({props.saves.length})</h4></Link>
                    <Link to={window.location.pathname + `/recipes`}><h4>Recipes({props.recipes.length})</h4></Link>
                </div>
            </div>
        </div>
    </>

}

export default Profile;