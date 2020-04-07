import React from 'react';
import { AxiosRequests } from '../api';
import { Account } from '../models';
import { Profile } from './Profile';

export class ProfileView extends React.Component {

    productRequests = new AxiosRequests();

    state = {
        userAccount: new Account()
    }

    render() {
        return <>
            <Profile account={this.state.userAccount} />
        </>
    }

    componentDidMount(userName) {
        this.productRequests.getProfileAccount(userName)
            .then(userAccount => this.setState(userAccount)
            .catch(alert(`No user with userName ${userName} in database :(`)));
    }

}

export default ProfileView;