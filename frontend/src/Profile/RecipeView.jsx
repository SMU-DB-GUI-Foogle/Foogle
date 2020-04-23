import React from 'react';
import { AxiosRequests } from '../api';
import { Account } from '../models';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export class RecipeView extends React.Component {

    recipeRequests = new AxiosRequests;

    state = {
        recipes: []
    }

    onDelete(recipeName) {
        if(window.confirm("Are you sure you want to delete this recipe?")) {
            let account = JSON.parse(sessionStorage.getItem("account"));
            this.recipeRequests.deleteRecipe(account.username, account.userId, recipeName)
            .then(() => {
                this.setState({ 
                    recipes: this.state.recipes.filter(x => x.recipeName !== recipeName)
                });
                alert("Recipe Deleted");
            })
        }
    }

    createRecipe() {
        let recipeName = prompt("Please enter a name for the new recipe", "");

        if (recipeName == null || recipeName == "") {
            alert("Addition Cancelled")
        }
        else {
            let account = JSON.parse(sessionStorage.getItem("account"));
            this.recipeRequests.createRecipe(account.username, account.userId, recipeName)
            .then(() => {
                let recipeList = this.state.recipes;
                recipeList.push({recipeName: recipeName});
                this.setState({ 
                    recipes: recipeList
                });
                alert("Recipe Added!");
            })
        }
    }

    render() {
        return <>
            <div className="card p-2">
                <p className="card-header">
                    My Recipes ({this.state.recipes.length})
                    <Button className="btn btn-primary float-right" type="button" onClick={e => this.createRecipe()}>
                        Add a Recipe
                    </Button>
                </p>
                <ul className="list-group">
                    { !this.state.recipes.length && (
                        <li className="list-group-item">
                            You don't have any recipes!
                        </li>)
                    }
                    {
                        this.state.recipes.length && this.state.recipes.map((p, i) => 
                            <li className="list-group mt-2" key={ i } id="group">
                                <div className=" list-group-item list-group-item-secondary">
                                    { i + 1 }. { p.recipeName }
                                    <button type="button"
                                            className="btn btn-sm btn-danger float-right"
                                            onClick={ e => this.onDelete(p.recipeName) }>
                                        X
                                    </button>
                                </div>
                                <div>
                                    <Link className="btn btn-primary m-1" to={`/${sessionStorage.getItem("username")}/recipes/${ p.recipeName }`}>Edit { p.recipeName }'s' Recipe</Link>
                                    <textarea id="hidden" class="js-copytextarea" rows="1" cols="1">{ window.location.href }</textarea>
                                    <Button className="btn btn-info m-1 float-right" type="button" onClick={ e => { 
                                        let copyText = document.querySelector('.js-copytextarea');
                                        copyText.select();
                                        document.execCommand("copy");
                                        alert("Link Copied to Clipboard!") } }>
                                        Share this Recipe
                                    </Button>
                                </div>  
                            </li>)
                    }
                </ul>
                <Link className="btn btn-secondary btn-block mt-2" to={`/${sessionStorage.getItem("username")}`}>
                    Return to Profile
                </Link>
            </div>
        </>
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.recipeRequests.getAccountRecipes(account.username, account.userId)
            .then(recipes => this.setState({ recipes }));    
    }
}

export default RecipeView;