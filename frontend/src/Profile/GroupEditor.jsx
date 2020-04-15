import React from 'react';
import { AxiosRequests } from '../api';
import { Group } from '../models';
import { Link, Redirect } from 'react-router-dom';

export class GroupEditor extends React.Component {

    profileRequests = new AxiosRequests();
    
    state = {
        username: '',
        groupName: '',
        desc: '',
    }

    validateForm() {
        return this.state.groupName.length > 0 && this.state.desc.length > 0;
    }

    // onSubmit() {
    //         this.accountRepository.updateAccount(this.state.id, this.state)
    //             .then(() => {
    //                 alert("Account Updated!");
    //                 this.setState({ redirect: "/" });
    //             });
    // }

    onSubmit() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        account.groups.push(new Group(this.state.groupName, this.state.desc, account.firstName + " " + account.lastName, []));
        window.alert("Group Added!");
        sessionStorage.setItem("account", JSON.stringify(account));
        this.setState({ redirect: "/profile/" + account.username + "/groups"});  
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }

        return <>
            <form className="card p-3">
                <h1>Group Editor</h1>
                <div className="form-group">
                    <label htmlFor="name">Group Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={ e => this.setState({ groupName: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label htmlFor="desc">Group Description</label>
                    <textarea type="text"
                        id="desc"
                        name="desc"
                        className="form-control"
                        value={this.state.desc}
                        onChange={ e => this.setState({ desc: e.target.value }) } />
                </div>

                <button type="button"
                        disabled={!this.validateForm()}
                        className="btn btn-primary btn-block"
                        onClick={ e => this.onSubmit() }>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to={`/profile/${this.state.username}/groups`}>
                    Return to My Groups
                </Link>
                
            </form>
        </>
    }

    componentDidMount() {
        // let accountId = this.props.match.params.id;
        // if(accountId) {
        //    this.accountRepository.getAccountById(accountId)
        //     .then(account => this.setState(account)); 
        // }
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.setState({username: account.username});        
    }
}

export default GroupEditor;