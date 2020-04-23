import React from 'react';
import { AxiosRequests } from '../api';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class AdvancedSearch extends React.Component {

    state = {
        property: "",
        lowerBound: 0,
        upperBound: 0,
        foodGroup: "",
        results: []
    }

    foodProperties = ["Serving Portion", "Total Calories", "Total Fat", "Trans Fat", "Saturated Fat", "Cholesterol", "Sodium", "Total Carbohydrates", "Sugars", "Protein"];
    foodPropertiesNames = ["servingPortion", "totalCalories", "totalFat", "transFat", "saturatedFat", "cholesterol", "sodium", "totalCarbohydrate", "sugars", "protein"];

    foodGroups = ["1"];

    searchRequests = new AxiosRequests();

    validateFormCustom() {
        return this.state.property.length > 0 && this.state.lowerBound > 0 && this.state.upperBound > 0;
    }

    groupSearch() {
        
    }

    render() {
        return <div className="container-fluid">
            <div className="card p-3 mb-3">
                <h1>Advanced Search (See Results At Bottom)</h1>
                <div className="list-group p-4">
                    <h3>Options:</h3>
                    <div className="list-group-item">
                        Filter for Workout: 
                        <div>          
                            <Button className="m-2">Workout (High Protein)</Button>
                            <Button className="m-2">Recovery (High Protein and Carbs)</Button>
                            <Button className="m-2">Performance (High Protein/Carbohydrates/Calcium)</Button>
                        </div>  
                    </div>
                    <div className="list-group-item">
                        Filter for Other Situations:
                        <div>             
                            <Button className="m-2">Sickness (WIP High Protein/Calories)</Button>
                            <Button className="m-2">Formulas (Baby Foods)</Button>
                        </div>
                    </div>
                    <div className="list-group-item">
                        Search by Food Group:             
                        <div className="col-12 d-flex">
                            <select
                                name="prop"
                                id="prop"
                                className="form-control col-4"
                                value={this.state.foodGroup}
                                onChange={ e => this.setState({ foodGroup: e.target.value })}>
                                <option></option>
                                {
                                    this.foodGroups.map((x, i) => <option key={ i }>{ x }</option>)
                                }
                            </select>
                        </div>
                        <Button className="btn-lg btn-info m-2"
                                disabled={ !this.state.foodGroup > 0 }
                                onClick={ e => this.groupSearch() } >
                            Search
                        </Button>
                    </div>
                    <div className="list-group-item">
                        Custom Search (based on Nutrition Facts):             
                        <div className="col-12 d-flex">
                            <select
                                name="prop"
                                id="prop"
                                className="form-control col-4"
                                value={this.state.property}
                                onChange={ e => this.setState({ property: e.target.value })}>
                                <option></option>
                                {
                                    this.foodProperties.map((x, i) => <option key={ i }>{ x }</option>)
                                }
                            </select>
                            <span className="col-1">Range:</span>
                            <div className="col-2">
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="form-control" 
                                    value={this.state.lowerBound}
                                    onChange={ e => this.setState({ lowerBound: e.target.value }) } />
                            </div>
                            <span className="col-3 d-flex">
                                <span className="h4 col-3">&lt;=</span> <span className=" h4 col-6">property</span> <span className="h4 col-3">&gt;=</span> 
                            </span>
                            <div className="col-2">
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="form-control" 
                                    value={this.state.upperBound}
                                    onChange={ e => this.setState({ upperBound: e.target.value }) } />
                            </div>
                        </div>
                        <Button className="btn-lg btn-info m-2" disabled={!this.validateFormCustom()}>Search</Button>
                    </div>
                </div>
            </div>

            <div className="card p-3">
                <h2>Search Results</h2>
                <div className="list-group p-4">
                {
                    this.state.results.length > 0
                    ? <>  
                        {this.state.results.map(product =>
                            <div key={ product.id } className="card p-3 m-3 align-items-center col-3 justify-content-between">
                                <h4 className="text-center text-wrap">{ product.foodName }</h4>
                                <div className="align-self-stretch">
                                    <Link to={`/product/${product.foodName}`}
                                        className="btn btn-block btn-info my-1">
                                        Product Details
                                    </Link>
                                </div>
                            </div>
                        )})
                    </>
                    : <>
                        <h2 className="card bg-info text-center mt-2">No Results!</h2>
                    </>
                }
                </div>
            </div>
        </div>
    }

}