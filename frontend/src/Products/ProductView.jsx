import React from 'react';
import { AxiosRequests } from '../api';

export class ProductView extends React.Component {

    productRequests = new AxiosRequests();

    render() {
        return <>
            Product goes here
        </>
    }

    componentDidMount(name) {
        this.productRequests.getProductByName(name)
            .then(product => this.setState(product)
            .catch(alert(`No product with name ${name} in database :(`)));
    }
}

export default ProductView;