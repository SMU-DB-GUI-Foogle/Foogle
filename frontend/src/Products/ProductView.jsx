import React from 'react';
import { AxiosRequests } from '../api';
import { Food } from '../models';
import { Product } from './Product';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        // let account = JSON.parse(sessionStorage.getItem("account"));
        // if(account.likes.find(x => (x === product))) {
        //     window.alert("Product already liked");
        // }
        // else {
        //     if(account.dislikes.find(x => (x === product)))
        //     {
        //         let itemToRemove = account.dislikes.indexOf(product);
        //         account.dislikes.splice(itemToRemove, itemToRemove + 1);
        //     }
        //     account.likes.push(product);
        //     sessionStorage.setItem("account", JSON.stringify(account));
        //     window.alert("Product Liked!");
        // } 
    }

    dislikeProduct(product) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        let foodName = product.replace(/%20/g, ' ');
        this.productRequests.dislikeProduct(account.userId, foodName)
            .then(alert("Product Disliked"))
        // let account = JSON.parse(sessionStorage.getItem("account"));
        // if(account.dislikes.find(x => (x === product))) {
        //     window.alert("Product already disliked");
        // }
        // else {
        //     if(account.likes.find(x => (x === product)))
        //     {
        //         let itemToRemove = account.likes.indexOf(product);
        //         account.likes.splice(itemToRemove, itemToRemove + 1);
        //     }
        //     account.dislikes.push(product);
        //     sessionStorage.setItem("account", JSON.stringify(account));
        //     window.alert("Product Disliked!");
        // } 
    }

    saveProduct(product) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        let foodName = product.replace(/%20/g, ' ');
        this.productRequests.saveProduct(account.userId, foodName)
            .then(alert("Product Saved"))
    }

    render() {
        return <>
            {this.state.product
            ? <>
                <Product product={this.state.product} />
                {window.sessionStorage.getItem("auth")
                ? <>
                    <div className="card align-content-start">
                        <div>
                            <Button className="m-1"
                                    type="button" 
                                    onClick={e => this.likeProduct( window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)) }>
                                Like
                            </Button>
                        </div>
                        <div>
                            <Button className="m-1"
                                    type="button"
                                    onClick={e => this.dislikeProduct(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1))}>
                                Dislike
                            </Button>
                        </div>
                        <div>
                            <Button className="m-1"
                                    type="button"
                                    onClick={e => this.saveProduct(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1))}>
                                Save
                            </Button>
                        </div>
                    </div>
                
                </>
                : <>
                    <div>Login to see more features</div>
                </>
                }
                {window.sessionStorage.getItem("admin")
                ? <>
                    <Link className="m-1 btn btn-warning"
                            to='/' >
                        Edit Product
                    </Link>
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
                            to='/' >
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