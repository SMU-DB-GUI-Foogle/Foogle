import React from 'react'
import { AxiosRequests } from '../api';
import { Link, Redirect } from 'react-router-dom';

export class ProductEditor extends React.Component {

    productRequests = new AxiosRequests();
    
    state = {
        foodName: "",
        servingPortion: 0,
        foodGroupId: 0,
        totalCalories: 0,
        totalFat: 0,
        transFat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sodium: 0,
        totalCarbohydrate: 0,
        sugars: 0,
        protein: 0,
        foodId: 0
    }

    validateForm() {
        return this.state.foodName.length > 0 && this.state.servingPortion > 0;
    }

    onSubmit() {
        if(this.state.foodId !== 0) {
            this.productRequests.updateProduct(this.state.foodId,
                                               this.state.foodName,
                                               this.state.servingPortion,
                                               this.state.foodGroupId,
                                               this.state.totalCalories,
                                               this.state.totalFat,
                                               this.state.transFat,
                                               this.state.saturatedFat,
                                               this.state.cholesterol,
                                               this.state.sodium,
                                               this.state.totalCarbohydrate,
                                               this.state.sugars,
                                               this.state.protein)
                .then(() => {
                    alert("Product Updated!");
                    this.setState({ redirect: "/product/" + this.state.foodName });
                })
        }
        else {
            this.productRequests.createProduct(this.state.foodName,
                                               this.state.servingPortion,
                                               this.state.foodGroupId,
                                               this.state.totalCalories,
                                               this.state.totalFat,
                                               this.state.transFat,
                                               this.state.saturatedFat,
                                               this.state.cholesterol,
                                               this.state.sodium,
                                               this.state.totalCarbohydrate,
                                               this.state.sugars,
                                               this.state.protein)
                .then(() => {
                alert("Product Created!");
                this.setState({ redirect: "/product/" + this.state.foodName });
                })
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }

        return <>
            <form className="card p-3">
                <h1>Product Editor</h1>
                <div className="form-group d-flex">
                    <div className="col-4">
                        <label htmlFor="fname">Food Name</label>
                        <input type="text"
                            id="fname"
                            name="fname"
                            className="form-control"
                            value={this.state.foodName}
                            onChange={ e => this.setState({ foodName: e.target.value }) } />
                    </div>
                    <div className="col-2">
                        <label htmlFor="amount">Food Group Id</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.foodGroupId}
                            onChange={ e => this.setState({ foodGroupId: e.target.value }) } />
                    </div>
                    <div className="col-6">
                        <label htmlFor="amount">Serving Portion</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.servingPortion}
                            onChange={ e => this.setState({ servingPortion: e.target.value }) } />
                    </div>
                </div>
                <div className="d-flex form-group">
                    <div className="col-6">
                        <label htmlFor="amount">Total Calories</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.totalCalories}
                            onChange={ e => this.setState({ totalCalories: e.target.value }) } />
                    </div>
                    <div className="col-6">
                        <label htmlFor="amount">Total Carbohydrates</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.totalCarbohydrate}
                            onChange={ e => this.setState({ totalCarbohydrate: e.target.value }) } />
                    </div>
                </div>
                <div className="d-flex form-group">
                    <div className="col-6">
                        <label htmlFor="amount">Total Fat</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.totalFat}
                            onChange={ e => this.setState({ totalFat: e.target.value }) } />
                    </div>
                    <div className="col-3">
                        <label htmlFor="amount">Trans Fat</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.transFat}
                            onChange={ e => this.setState({ transFat: e.target.value }) } />
                    </div>
                    <div className="col-3">
                        <label htmlFor="amount">Saturated Fat</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.saturatedFat}
                            onChange={ e => this.setState({ saturatedFat: e.target.value }) } />
                    </div>
                </div>
                <div className="d-flex form-group">
                    <div className="col-3">
                        <label htmlFor="amount">Cholesterol</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.cholesterol}
                            onChange={ e => this.setState({ cholesterol: e.target.value }) } />
                    </div>
                    <div className="col-3">
                        <label htmlFor="amount">Sodium</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.sodium}
                            onChange={ e => this.setState({ sodium: e.target.value }) } />
                    </div>
                    <div className="col-3">
                        <label htmlFor="amount">Sugars</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.sugars}
                            onChange={ e => this.setState({ sugars: e.target.value }) } />
                    </div>
                    <div className="col-3">
                        <label htmlFor="amount">Protein</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.protein}
                            onChange={ e => this.setState({ protein: e.target.value }) } />
                    </div>
                </div>
                <button type="button"
                        disabled={!this.validateForm()}
                        className="btn btn-primary btn-block"
                        onClick={ e => this.onSubmit() }>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to={`/product/${this.state.foodName}`}>
                    Return to Product
                </Link>
            </form>
        </>
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        let foodName = this.props.match.params.name.replace(/%20/g, ' ');
        this.setState({ foodName: foodName });
        this.productRequests.getProductByName(foodName)
            .then(product => {debugger;
                if(product.length > 0) {
                    this.setState({ servingPortion: product[0].servingPortion,
                                    foodGroupId: product[0].foodGroupId,
                                    totalCalories: product[0].totalCalories,
                                    totalFat: product[0].totalFat,
                                    transFat: product[0].transFat,
                                    saturatedFat: product[0].saturatedFat,
                                    cholesterol: product[0].cholesterol,
                                    sodium: product[0].sodium,
                                    totalCarbohydrate: product[0].totalCarbohydrate,
                                    sugars: product[0].sugars,
                                    protein: product[0].protein,
                                    foodId: product[0].foodId })
                }
            });        
    }
}

export default ProductEditor;