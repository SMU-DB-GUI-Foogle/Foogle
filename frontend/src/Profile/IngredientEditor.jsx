import React from 'react'
import { Product } from '../models'

export class IngredientEditor extends React.Component {
    state = {
        name: '',
        amount: 0
    }
    
    onIngredientAdded() {
        this.props.onIngredientAdded([this.state.name, this.state.amount]);
        this.setState({ name: "", amount: 0});
    }

    render() {
        return(
            <div className="row mt-4 mb-4">
                    <div className="col-6">
                        <label htmlFor="name">Ingredient Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            value={this.state.name}
                            onChange={ e => this.setState({ name: e.target.value }) }>
                        </input>
                    </div>
                    <div className="col-3">
                        <label htmlFor="amount">Ingredient Amount</label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="form-control" 
                            value={this.state.amount}
                            onChange={ e => this.setState({ amount: e.target.value }) } />
                    </div>
                    <div className="col-3">
                        <br/>
                        <button
                            type="button"
                            id="buttonRules"
                            className="btn btn-block"
                            disabled={!(this.state.name.length > 0 && this.state.amount > 0)}
                            onClick={ () => this.onIngredientAdded()} >
                            Add
                        </button>
                    </div>

                </div>
        );
    }
}