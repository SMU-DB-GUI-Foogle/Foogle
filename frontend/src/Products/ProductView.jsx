import React from 'react';
import { AxiosRequests } from '../api';
import { Food } from '../models';
import { Product } from './Product';

export class ProductView extends React.Component {

    productRequests = new AxiosRequests();

    state = {
        product: new Food()
    }

    render() {
        return <>
            <Product />
        </>
    }

    componentDidMount(name) {
        this.productRequests.getProductByName(name)
            .then(product => this.setState(product)
            .catch(alert(`No product with name ${name} in database :(`)));
    }
}

export default ProductView;