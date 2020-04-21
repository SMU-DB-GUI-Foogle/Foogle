import React from 'react';
import { AxiosRequests } from '../api';
import { Account } from '../models';
import { Link } from 'react-router-dom';

export class GroupView extends React.Component {

    groupRequests = new AxiosRequests;

    state = {
        groups: []
    }
    //let account = JSON.parse(sessionStorage.getItem("account"));

    onDelete(group) {
        if(window.confirm("Are you sure you want to delete this group?")) {
            // this.accountRepository.deleteAccount(accountId)
            // .then(() => {
            //     this.setState({ 
            //         accounts: this.state.accounts.filter(x => x.id !== accountId)
            //     });
            //     alert("Account Deleted");
            // });
            let account = this.state.account;
            if(account.groups.find(x => (x === group)))
            {
                let itemToRemove = account.groups.indexOf(group);
                account.groups.splice(itemToRemove, itemToRemove + 1);
            }
            sessionStorage.setItem("account", JSON.stringify(account));
            this.setState({ account: account });
            window.alert("Group Deleted!");
        }
    }

    render() {
        return <>
            <div className="card p-2">
                {/* <p>My Groups ({props.account.groups.length})</p> */}
                <p className="card-header">
                    My Groups ({this.state.groups.length})
                    <Link className="btn btn-primary float-right" to={window.location.pathname + "/edit"}>
                        Add a Group
                    </Link>
                </p>
                <div className="clearfix"></div>
                <ul className="list-group">
                    { !this.state.account.groups.length && (
                        <li className="list-group-item">
                            You aren't a part of any groups!
                        </li>)
                    }
                    {
                        this.state.groups.length && this.state.groups.map((p, i) => 
                            <li className="list-group" key={ i } id="group">
                                <div className=" list-group-item list-group-item-secondary">
                                    { i + 1 }. { p.name }
                                    <button type="button"
                                            className="btn btn-sm btn-danger float-right"
                                            onClick={ e => this.onDelete(p) }>
                                        X
                                    </button>
                                </div>
                                {/* <div className="list-group-item list-group-item-light">
                                    Owner: { p.owner }
                                    <ul className="list-group">
                                    { !p.members.length && (
                                        <li className="list-group-item">
                                            There are no other members of this group!
                                        </li>)
                                    }
                                    {
                                        p.members.map((m,j) => 
                                            <li className="list-group" key={ j } id="member">
                                                <div className=" list-group-item list-group-item-secondary">{ j + 1 }. { m }</div>
                                            </li>)
                                    }
                                    </ul>
                                    <span className="text-dark">"{ p.description }"</span>
                                </div> */}
                            </li>)
                    }
                </ul>
                <Link className="btn btn-secondary btn-block mt-2" to={`/${this.state.account.username}`}>
                    Return to Profile
                </Link>
            </div>
        </>
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.groupRequests.getAccountGroups(account.username, account.userId)
            .then(groups => this.setState({ groups }));  
    }
}

export default GroupView;