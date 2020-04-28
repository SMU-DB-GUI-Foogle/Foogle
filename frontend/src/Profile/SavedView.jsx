import React from 'react';
import { Saved } from './Saved';
import { AxiosRequests } from '../api';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

export class SavedView extends React.Component {

    profileRequests = new AxiosRequests();

    state = {
        saves: []
    }

    handleDeleteSaved(foodName) {
        notification.open({
            key: "save",
            message: "Are you sure you want to delete this saved product from your profile?",
            duration: 0,
            btn: <button type="button" className="btn btn-primary" size="small" onClick={e => { 
                    this.deleteLiked(foodName);
                    notification.close("save"); }}>Confirm</button>
        })
    }

    deleteSaved(foodName) {
        let account = JSON.parse(sessionStorage.getItem('account'));
        this.profileRequests.deleteSavedProduct(account.userId, foodName)
        .then(() => {
            this.setState({ 
                saves: this.state.saves.filter(x => x.foodName !== foodName)
            });
            notification.success({
                message: 'Saved Product Removed!',
                placement: 'bottomRight'
            });
        });
    }

    render() {
        return <div className="container">
            <div className="card p-2 m-2">
                <h2>My Saved Products ({this.state.saves.length})</h2>
                <Saved deleteSaved={name => this.handleDeleteSaved(name)} saves={this.state.saves} />
            </div> 
            <Link className="btn btn-secondary btn-block mt-2" to={`/${sessionStorage.getItem("username")}`}>
                Return to Profile
            </Link>
        </div>
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.profileRequests.getAccountSaves(account.username, account.userId)
        .then(saves => this.setState({ saves }));
    }

}

export default SavedView;