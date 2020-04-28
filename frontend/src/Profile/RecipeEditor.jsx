import React from 'react';
import { AxiosRequests } from '../api';
import { Recipe } from '../models';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { IngredientEditor } from './IngredientEditor';
import { DeleteTwoTone } from '@ant-design/icons';
import { notification } from 'antd';

export class RecipeEditor extends React.Component {

    recipeRequests = new AxiosRequests();
    
    state = {
        userId: '',
        name: '',
        ingredients: []
    }

    validateForm() {
        return this.state.ingredients.length > 0;
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
            notification.success({
                message: 'Ingredient Added!',
                placement: 'bottomRight'
            });
        })
    }

    handleDeleteIngredient(ingredient) {
        notification.open({
            key: "delete",
            message: `Are you sure you want to delete the ingredient ${ingredient} from your recipe?`,
            duration: 0,
            btn: <button type="button" className="btn btn-primary" size="small" onClick={e => { 
                    this.deleteIngredient(ingredient);
                    notification.close("delete"); }}>Confirm</button>
        })
    }

    deleteIngredient(ingredient) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.recipeRequests.deleteIngredient(account.username, account.userId, this.state.name, ingredient)
        .then(() => {
            this.setState({ 
                ingredients: this.state.ingredients.filter(x => x.ingredient !== ingredient)
            });
            notification.success({
                message: 'Ingredient Removed!',
                placement: 'bottomRight'
            });
        })
    }

    onSubmit() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        notification.success({
            message: 'Recipe Updated!',
            placement: 'bottomRight'
        });;
        this.setState({ redirect: "/" + account.username + '/recipes'}) 
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }

        return <div className="container">
            <form className="card p-3">
                <h1>Recipe Editor</h1>
                <div className="form-group">
                    <label htmlFor="name">Recipe Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={this.state.name} />
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
                            <Button className="float-right btn-danger" type="button" onClick={e => this.handleDeleteIngredient(p.ingredient)} >
                                <DeleteTwoTone className="align-middle" twoToneColor="#a8a8a8"/>
                            </Button>
                            <span className="card float-right p-2 mr-2">
                                Amount: { p.numberOfServings }
                            </span>
                            <div className="">
                                <Link to={`/product/${ p.ingredient }`}>Link to { p.ingredient }'s product page</Link>
                                
                            </div> 
                        </li>)
                }

                <button type="button"
                        id="buttonRules"
                        disabled={!this.validateForm()}
                        className="btn btn-block mt-2"
                        onClick={ e => this.onSubmit() }>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to={`/${this.state.username}/recipes`}>
                    Return to My Recipes
                </Link>
                
            </form>
        </div>
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