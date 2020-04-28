import React from 'react';
import { AxiosRequests } from '../api';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

export class AdvancedSearch extends React.Component {

    state = {
        property: "",
        lowerBound: 0,
        upperBound: 0,
        foodGroup: "",
        results: [],
        foodGroups: []
    }

    foodProperties = ["Serving Portion", "Total Calories", "Total Fat", "Trans Fat", "Saturated Fat", "Cholesterol", "Sodium", "Total Carbohydrates", "Sugars", "Protein"];
    foodPropertiesNames = ["servingPortion", "totalCalories", "totalFat", "transFat", "saturatedFat", "cholesterol", "sodium", "totalCarbohydrate", "sugars", "protein"];

    searchRequests = new AxiosRequests();

    validateFormCustom() {
        return this.state.property.length > 0 && this.state.lowerBound > 0 && this.state.upperBound > 0;
    }

    groupSearch() {
        let foodGroupId = this.state.foodGroups.find(x => x.foodGroup === this.state.foodGroup).id;
        this.searchRequests.getProductsByFoodGroup(foodGroupId)
            .then(products => {
                this.setState({ results: products });
                notification.success({
                    message: 'Search Complete!',
                    description: 'Scroll to the bottom to see your results!',
                    placement: 'bottomRight'
                });
            })
    }

    customSearch() {
        let foodProp = this.foodPropertiesNames[this.foodProperties.indexOf(this.state.property)];
        this.searchRequests.getProductsByNutrition(foodProp, this.state.lowerBound, this.state.upperBound)
            .then(products => {
                this.setState({ results: products });
                notification.success({
                    message: 'Search Complete!',
                    description: 'Scroll to the bottom to see your results!',
                    placement: 'bottomRight'
                });
            })
            
    }

    workoutSearch(start) {
        this.searchRequests.getProductsByNutrition("protein", start, 100)
            .then(products => {
                this.setState({ results: products });
                notification.success({
                    message: 'Search Complete!',
                    description: 'Scroll to the bottom to see your results!',
                    placement: 'bottomRight'
                });
            })
    }

    sicknessSearch() {
        this.searchRequests.getProductsByNutrition("totalCalories", 400, 800)
            .then(products => {
                this.setState({ results: products });
                notification.success({
                    message: 'Search Complete!',
                    description: 'Scroll to the bottom to see your results!',
                    placement: 'bottomRight'
                });
            })
    }

    babyFoodSearch() {
        this.searchRequests.getAllProducts()
            .then(products => {
                let baby = [];
                for(let i = 0; i < products.length; i++)
                    if (products[i].foodName.indexOf("Babyfood") !== -1)
                        baby.push(products[i]); 
                    this.setState({ results: baby });
                notification.success({
                    message: 'Search Complete!',
                    description: 'Scroll to the bottom to see your results!',
                    placement: 'bottomRight'
                });
            })
    }

    render() {
        return <div  className="container">
            <div id = "advancedSearchContainer" className="card p-3 mb-3">
                <h1>Advanced Search (See Results At Bottom)</h1>
                <div  className="list-group p-4">
                    <h3>Options:</h3>
                    <div className="list-group-item">
                        Filter for Workout: 
                        <div>          
                            <Button id = "asButton" className="m-2" onClick={ e => this.workoutSearch(20) }>Workout (High Protein)</Button>
                            <Button id = "asButton" className="m-2" onClick={ e => this.workoutSearch(30) }>Recovery (High Protein and Carbs)</Button>
                            <Button id = "asButton" className="m-2" onClick={ e => this.workoutSearch(40) }>Performance (High Protein, Carbohydrates, or Calcium)</Button>
                        </div>  
                    </div>
                    <div className="list-group-item">
                        Filter for Other Situations:
                        <div>             
                            <Button id = "asButton" className="m-2" onClick={ e => this.sicknessSearch() }>Sickness (High Protein/Calories)</Button>
                            <Button id = "asButton" className="m-2" onClick={ e => this.babyFoodSearch() }>Formulas (Baby Foods)</Button>
                        </div>
                    </div>
                    <div className="list-group-item">
                        Search by Food Group:             
                        <div className="col-12 d-flex">
                            <select
                                name="prop"
                                id="prop"
                                className="form-control col-md-4"
                                value={this.state.foodGroup}
                                onChange={ e => this.setState({ foodGroup: e.target.value })}>
                                <option></option>
                                {this.state.foodGroups.length > 0
                                ? 
                                    this.state.foodGroups.map((x, i) => <option key={ i }>{ x.foodGroup }</option>)
                                : <> </>    
                                }
                            </select>
                        </div>
                        <Button id = "asButton" className="btn-lg btn-info m-2"
                                disabled={ !this.state.foodGroup > 0 }
                                onClick={ e => this.groupSearch() } >
                            Search
                        </Button>
                    </div>
                    <div className="list-group-item" >     
                        <div className="col-12 d-flex flex-wrap">
                            <div className="col-md-4">
                                <label htmlFor="prop">Custom Search (based on Nutrition Facts):</label>
                                <select
                                    name="prop"
                                    id="prop"
                                    className="form-control"
                                    value={this.state.property}
                                    onChange={ e => this.setState({ property: e.target.value })}>
                                    <option></option>
                                    {
                                        this.foodProperties.map((x, i) => <option key={ i }>{ x }</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="amount1">Upper Bound</label>
                                <input
                                    type="number"
                                    name="amount1"
                                    id="amount1"
                                    className="form-control" 
                                    value={this.state.lowerBound}
                                    onChange={ e => this.setState({ lowerBound: e.target.value }) } />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="amount2">Lower Bound</label>
                                <input
                                    type="number"
                                    name="amount2"
                                    id="amount2"
                                    className="form-control" 
                                    value={this.state.upperBound}
                                    onChange={ e => this.setState({ upperBound: e.target.value }) } />
                            </div>
                        </div>
                        <Button id = "asButton"
                                className="btn-lg btn-info m-2"
                                disabled={ !this.validateFormCustom() }
                                onClick={ e => this.customSearch() } >
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            <div className="card p-3">
                <h2>Search Results</h2>
                <div className="list-group p-4">
                {
                    this.state.results.length > 0
                    ? <>  
                        <div id="productsContainer" className="d-flex flex-wrap justify-content-around">
                            {this.state.results.map(product =>
                                <div id = "productResult" key={ product.id } className="card p-3 my-2 justify-content-between col-md-5 ">
                                    <h4 className="text-center text-wrap">{ product.foodName }</h4>
                                    <div className="align-self-stretch">
                                        <Link id = "productButton" to={`/product/${product.foodName}`}
                                            className="btn btn-block btn-info my-1">
                                            Product Details
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                    : <>
                        <h2 id = "noResults" >No Results!</h2>
                    </>
                }
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        this.searchRequests.getFoodGroups()
            .then(foodGroups => this.setState({ foodGroups }));
    }

}