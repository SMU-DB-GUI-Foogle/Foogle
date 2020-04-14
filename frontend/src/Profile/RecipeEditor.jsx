import React from 'react';
import { AxiosRequests } from '../api';
import { Account } from '../models';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export class RecipeEditor extends React.Component {

    recipeRequests = new AxiosRequests;

    state = {
        account: new Account('', '', '', '', '', [], [], [], [], [])
    }
    //let account = JSON.parse(sessionStorage.getItem("account"));

    render() {
        return <>
            <div>
                {/* <p>My Groups ({props.account.saved.length})</p> */}
                <p>My Recipes ({this.state.account.recipes.length})</p>
                <ul className="list-group">
                    { !this.state.account.recipes.length && (
                        <li className="list-group-item">
                            You don't have any recipes!
                        </li>)
                    }
                    {
                        this.state.account.saved.map((p, i) => 
                            <li className="list-group" key={ i } id="group">
                                <div className=" list-group-item list-group-item-secondary">{ i + 1 }. { p }</div>
                                <div className="list-group-item">
                                    <Link to={`/product/${ p }`}>Link to { p }'s product page</Link>
                                    <Button className="float-right" type="button">Add to Recipe</Button>
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
        this.setState(account);        
    }
}

export default RecipeEditor;