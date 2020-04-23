import React from 'react';
import { AxiosRequests } from '../api';
import { Food } from '../models';
import { Product } from './Product';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

export class ProductView extends React.Component {

    productRequests = new AxiosRequests();

    state = {
        product: '',
        found: false
    }

    likeProduct(product) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        let foodName = product.replace(/%20/g, ' ');
        this.productRequests.likeProduct(account.userId, foodName)
            .then(alert("Product Liked"))
    }

    dislikeProduct(product) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        let foodName = product.replace(/%20/g, ' ');
        this.productRequests.dislikeProduct(account.userId, foodName)
            .then(alert("Product Disliked"))
    }

    saveProduct(product) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        let foodName = product.replace(/%20/g, ' ');
        this.productRequests.saveProduct(account.userId, foodName)
            .then(alert("Product Saved"))
    }

    deleteProduct() {
        if(window.confirm("Are you sure you want to delete this product?")) {
            let foodName = this.props.match.params.name;
            this.productRequests.deleteProduct(foodName)
                .then(() => {
                    this.setState({ redirect: '/' });
                    alert("Product Deleted "); 
                });
        }
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }

        return <>
            {this.state.product
            ? <>
                <Product product={this.state.product} />
                {window.sessionStorage.getItem("auth")
                ? <>
                    <div className="card align-content-start">
                        <div>
                            <Button id = "buttonRules"
                                    className="m-1"
                                    type="button" 
                                    onClick={e => this.likeProduct( window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)) }>
                                Like
                            </Button>
                        </div>
                        <div>
                            <Button id = "buttonRules"
                                    className="m-1"
                                    type="button"
                                    onClick={e => this.dislikeProduct(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1))}>
                                Dislike
                            </Button>
                        </div>
                        <div>
                            <Button id = "buttonRules"
                                    className="m-1"
                                    type="button"
                                    onClick={e => this.saveProduct(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1))}>
                                Save
                            </Button>
                        </div>
                    </div>
                
                </>
                : <>
                    <h2 className="card bg-info text-center mt-2">Login to see more features!</h2>
                </>
                }
                {window.sessionStorage.getItem("admin")
                ? <>
                    <Link className="m-1 btn btn-warning"
                            to={`${window.location.pathname}/edit`} >
                        Edit Product
                    </Link>
                    <Button className="m-1 btn btn-danger float-right"
                            type="button" 
                            onClick={e => this.deleteProduct() } >
                        Delete Product
                    </Button>
                </>
                : <>
                </>
                }
            </>
            : <>
                <h1 className="card bg-warning text-center">No Product found! Please click "Foogle" or Search Again!</h1>
                {window.sessionStorage.getItem("admin")
                ? <>
                    <Link className="m-1 btn btn-warning"
                            to={`${window.location.pathname}/edit`} >
                        Add Product
                    </Link>
                </>
                : <>
                </>
                }
            </>
            }
            
        </>
    }

    componentDidMount() {
        let foodName = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1).replace(/%20/g, ' ');
        this.productRequests.getProductByName(foodName)
            .then(product => {
                if(product.length > 0) {
                    this.setState({ product: new Food(product[0]), found: true });
                }
            });
    }
}

export default ProductView;