import React from 'react';
import { Saved } from './Saved';
import { AxiosRequests } from '../api';
import { Link } from 'react-router-dom';

export class SavedView extends React.Component {

    profileRequests = new AxiosRequests();

    state = {
        saves: []
    }

    deleteSaved(foodName) {
        if(window.confirm("Are you sure you want to delete this saved product from your profile?")) {
            let account = JSON.parse(sessionStorage.getItem('account'));
            this.profileRequests.deleteSavedProduct(account.userId, foodName)
            .then(() => {
                this.setState({ 
                    saves: this.state.saves.filter(x => x.foodName !== foodName)
                });
                alert("Saved Product Removed");
            });
        }
    }

    render() {
        return <>
            <div className="card p-2 m-2">
                <h2>My Saved Products ({this.state.saves.length})</h2>
                <Saved deleteSaved={name => this.deleteLiked(name)} saves={this.state.saves} />
            </div> 
            <Link className="btn btn-secondary btn-block mt-2" to={`/${sessionStorage.getItem("username")}`}>
                Return to Profile
            </Link>
        </>
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.profileRequests.getAccountSaves(account.username, account.userId)
        .then(saves => this.setState({ saves }));
    }

}

export default SavedView;