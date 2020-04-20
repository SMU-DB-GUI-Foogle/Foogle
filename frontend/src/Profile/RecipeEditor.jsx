import React from 'react';
import { AxiosRequests } from '../api';
import { Recipe } from '../models';
import { Link, Redirect } from 'react-router-dom';
import { IngredientEditor } from './IngredientEditor'

export class RecipeEditor extends React.Component {

    profileRequests = new AxiosRequests();
    
    state = {
        username: '',
        name: '',
        desc: '',
        ingredients: []
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.desc.length > 0 && this.state.ingredients.length > 0;
    }

    onIngredientAdded(ingredient) {
        let ingredients = this.state.ingredients;
        ingredients.push(ingredient);
        this.setState({ ingredients });
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
        account.recipes.push(new Recipe(this.state.name, this.state.desc, account.firstName + " " + account.lastName, this.state.ingredients));
        window.alert("Recipe Added!");
        sessionStorage.setItem("account", JSON.stringify(account));
        this.setState({ redirect: "/" + account.username + "/recipes"});  
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }

        return <>
            <form className="card p-3">
                <h1>Recipe Editor</h1>
                <div className="form-group">
                    <label htmlFor="name">Recipe Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={ e => this.setState({ name: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label htmlFor="desc">Recipe Description</label>
                    <textarea type="text"
                        id="desc"
                        name="desc"
                        className="form-control"
                        value={this.state.desc}
                        onChange={ e => this.setState({ desc: e.target.value }) } />
                </div>

                <IngredientEditor onIngredientAdded={ ingredient => this.onIngredientAdded(ingredient) }/>
                <li className="list-group-item">Ingredients</li>
                { !this.state.ingredients.length && (
                    <li className="list-group-item">
                        No Ingredients Added.
                    </li>)
                }
                {
                    this.state.ingredients.map((p, i) => 
                        <li className="list-group-item" key={ i }>
                            { p[0] }
                            <span className="card float-right p-2">
                                Amount: { p[1] }
                            </span>
                        </li>)
                }

                <button type="button"
                        disabled={!this.validateForm()}
                        className="btn btn-primary btn-block mt-2"
                        onClick={ e => this.onSubmit() }>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to={`/${this.state.username}/recipes`}>
                    Return to My Recipes
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

export default RecipeEditor;