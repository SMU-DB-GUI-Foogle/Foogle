import React from 'react';
import { Redirect } from 'react-router-dom';
import { Image } from 'react-bootstrap';

export const Profile = props => {

    if(!sessionStorage.getItem("auth") || window.location.pathname !== `/profile/${sessionStorage.getItem("username")}`) {
        return (<Redirect to="/"/>);
    }

    let account = JSON.parse(sessionStorage.getItem('account'));
    

    return <>
        <div className="row">
            <div className="col-5">
                <Image src="https://placehold.it/200x200" rounded />
            </div>
            <div className="col-6 card">
                <h2 className="card-header">{account.firstName} {account.lastName}</h2>
                {/* props.account.firstName + props.account.lastName; */}
                <div className="card-body">
                    <h4>Likes({account.likes.length})</h4> {/* props.account.likes.size */}
                    <h4>Dislikes({account.dislikes.length})</h4> {/* props.account.dislikes.size */}
                    <h4>Saved({account.saved.length})</h4> {/* props.account.saved.size */}
                    <h4>Groups({account.groups.length})</h4> {/* props.account.groups.size */}
                    <h4>Recipes({account.recipes.length})</h4> {/* props.account.recipies.size */}
                </div>
            </div>
        </div>
    </>

}

export default Profile;