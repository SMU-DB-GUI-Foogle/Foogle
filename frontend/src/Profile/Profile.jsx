import React from 'react';
import { Redirect } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import profileDefault from '../profileDefault.jpg';

export const Profile = props => {

    if(!sessionStorage.getItem("auth") || window.location.pathname !== `/${sessionStorage.getItem("username")}`) {
        return (<Redirect to="/"/>);
    }

    let account = JSON.parse(sessionStorage.getItem('account'));
    

    return <>
        <div className="row d-flex justify-content-center">
            <div className="col-4">
                <img src = {profileDefault}></img>
                {/* <Image src="https://placehold.it/200x200" rounded /> */}
            </div>
            <div className="col-8 card">
                <h2 className="card-header">{account.firstName} {account.lastName}</h2>
                <div className="card-body">
                    <h4>Likes({props.likes.length})</h4>
                    <h4>Dislikes({props.dislikes.length})</h4>
                    <h4>Saved({props.saves.length})</h4>
                    <h4>Recipes({props.recipes.length})</h4>  
                </div>
            </div>
        </div>
    </>

}

export default Profile;