import React from 'react';
import { AxiosRequests } from '../api';
import { Account } from '../models';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export class RecipeView extends React.Component {

    recipeRequests = new AxiosRequests;

    state = {
        account: new Account('', '', '', '', '', [], [], [], [], [])
    }
    //let account = JSON.parse(sessionStorage.getItem("account"));

    onDelete(recipe) {
        if(window.confirm("Are you sure you want to delete this recipe?")) {
            // this.accountRepository.deleteAccount(accountId)
            // .then(() => {
            //     this.setState({ 
            //         accounts: this.state.accounts.filter(x => x.id !== accountId)
            //     });
            //     alert("Account Deleted");
            // });
            let account = this.state.account;
            if(account.recipes.find(x => (x === recipe)))
            {
                let itemToRemove = account.recipes.indexOf(recipe);
                account.recipes.splice(itemToRemove, itemToRemove + 1);
            }
            sessionStorage.setItem("account", JSON.stringify(account));
            this.setState({ account: account });
            window.alert("Recipe Deleted!");
        }
    }

    render() {
        return <>
            <div className="card p-2">
                {/* <p>My Groups ({props.account.saved.length})</p> */}
                <p className="card-header">
                    My Recipes ({this.state.account.recipes.length})
                    <Link className="btn btn-primary float-right" to={window.location.pathname + "/edit"}>
                        Add a Recipe
                    </Link>
                </p>
                <ul className="list-group">
                    { !this.state.account.recipes.length && (
                        <li className="list-group-item">
                            You don't have any recipes!
                        </li>)
                    }
                    {
                        this.state.account.recipes.map((p, i) => 
                            <li className="list-group mt-2" key={ i } id="group">
                                <div className=" list-group-item list-group-item-secondary">
                                    { i + 1 }. { p.name }
                                    <button type="button"
                                            className="btn btn-sm btn-danger float-right"
                                            onClick={ e => this.onDelete(p) }>
                                        X
                                    </button>
                                </div>
                                <p className="list-group-item">Description: { p.description }</p>
                                { !p.ingredients.length && (
                                        <li className="list-group-item">
                                            There are no ingredients in this recipe!
                                        </li>)
                                }
                                {
                                    p.ingredients.map((m,j) => 
                                        <li className="list-group-item" key={ j } id="member">
                                            { j + 1 }. { m[0] }
                                            <span className="card float-right p-2">
                                                Amount: { m[1] }
                                            </span>
                                            <div className="">
                                                <Link to={`/product/${ m[0] }`}>Link to { m[0] }'s product page</Link>
                                            </div>                                            
                                        </li>)
                                }
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
        // let accountId = this.props.match.params.id;
        // if(accountId) {
        //    this.accountRepository.getAccountById(accountId)
        //     .then(account => this.setState(account)); 
        // }
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.setState({ account: account });        
    }
}

export default RecipeView;