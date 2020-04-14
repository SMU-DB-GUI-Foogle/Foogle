import React from 'react';
import { AxiosRequests } from '../api';
import { Account } from '../models';

export class GroupEditor extends React.Component {

    groupRequests = new AxiosRequests;

    state = {
        account: new Account('', '', '', '', '', [], [], [], [], [], [])
    }
    //let account = JSON.parse(sessionStorage.getItem("account"));

    render() {
        return <>
            <div>
                {/* <p>My Groups ({props.account.groups.length})</p> */}
                <p>My Groups ({this.state.account.groups.length})</p>
                <ul className="list-group">
                    { !this.state.account.groups.length && (
                        <li className="list-group-item">
                            You aren't a part of any groups!
                        </li>)
                    }
                    {
                        this.state.account.groups.map((p, i) => 
                            <li className="list-group" key={ i } id="group">
                                <div className=" list-group-item list-group-item-secondary">{ i + 1 }. { p.name }</div>
                                <div className="list-group-item list-group-item-light">
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
                                    
                                </div>
                            </li>)
                    }
                </ul>
            </div>
        </>
    }

    componentDidMount() {
        // let accountId = this.props.match.params.id;
        // if(accountId) {
        //    this.accountRepository.getAccountById(accountId)
        //     .then(account => this.setState(account)); 
        // }
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.setState({ account: account });  
    }
}

export default GroupEditor;