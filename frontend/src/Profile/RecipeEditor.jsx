import React from 'react';
import { AxiosRequests } from '../api';
import { Recipe } from '../models';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { IngredientEditor } from './IngredientEditor';

export class RecipeEditor extends React.Component {

    recipeRequests = new AxiosRequests();
    
    state = {
        userId: '',
        name: '',
        ingredients: []
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.ingredients.length > 0;
    }

    onIngredientAdded(ingredient) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.recipeRequests.createIngredient(account.username, account.userId, this.state.name, ingredient[0], ingredient[1])
        .then(() => {
            let ingredientList = this.state.ingredients;
            ingredientList.push({ingredient: ingredient[0], numberOfServings: ingredient[1]});
            this.setState({ 
                recipes: ingredientList
            });
            alert("Ingredient Added!");
        })
    }

    deleteIngredient(ingredient) {
        if(window.confirm("Are you sure you want to delete this ingredient?")) {
            let account = JSON.parse(sessionStorage.getItem("account"));
            this.recipeRequests.deleteIngredient(account.username, account.userId, this.state.name, ingredient)
            .then(() => {
                this.setState({ 
                    ingredients: this.state.ingredients.filter(x => x.ingredient !== ingredient)
                });
                alert("Ingredient Deleted");
            })
        }
    }

    onSubmit() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.recipeRequests.updateProfile(account.username, account.userId, this.state.name)
        .then(() => {
            alert("Recipe Updated!");
            this.setState({ redirect: "/" + account.username + '/recipes'}) 
        })
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

                <IngredientEditor onIngredientAdded={ ingredient => this.onIngredientAdded(ingredient) }/>
                <li className="list-group-item">Ingredients</li>
                { !this.state.ingredients.length && (
                    <li className="list-group-item">
                        No Ingredients Added.
                    </li>)
                }
                {
                    this.state.ingredients.length && this.state.ingredients.map((p, i) => 
                        <li className="list-group-item" key={ i }>
                            { p.ingredient }
                            <Button className="float-right btn-danger" type="button" onClick={e => this.deleteIngredient(p.ingredient)} >X</Button>
                            <span className="card float-right p-2 mr-2">
                                Amount: { p.numberOfServings }
                            </span>
                            <div className="">
                                <Link to={`/product/${ p.ingredient }`}>Link to { p.ingredient }'s product page</Link>
                                
                            </div> 
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
        debugger;
        let account = JSON.parse(sessionStorage.getItem("account"));
        let recipeName = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1).replace(/%20/g, ' ');
        this.setState({ name: recipeName,
                        userId: account.userId,
                        username: account.username });
        this.recipeRequests.getRecipeByName(account.username, account.userId, recipeName)
            .then(recipes => {
                if(recipes.length > 0) {
                    this.setState({ ingredients: recipes })
                }
            });       
    }
}

export default RecipeEditor;