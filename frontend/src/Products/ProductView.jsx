import React from 'react';
import { AxiosRequests } from '../api';
import { Food } from '../models';
import { Product } from './Product';
import { Button } from 'react-bootstrap';

export class ProductView extends React.Component {

    productRequests = new AxiosRequests();

    state = {
        product: new Food()
    }

    addLike(product) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        if(account.likes.find(x => (x === product))) {
            window.alert("Product already liked");
        }
        else {
            if(account.dislikes.find(x => (x === product)))
            {
                let itemToRemove = account.dislikes.indexOf(product);
                account.dislikes.splice(itemToRemove, itemToRemove + 1);
            }
            account.likes.push(product);
            sessionStorage.setItem("account", JSON.stringify(account));
            window.alert("Product Liked!");
        } 
    }

    addDislike(product) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        if(account.dislikes.find(x => (x === product))) {
            window.alert("Product already disliked");
        }
        else {
            if(account.likes.find(x => (x === product)))
            {
                let itemToRemove = account.likes.indexOf(product);
                account.likes.splice(itemToRemove, itemToRemove + 1);
            }
            account.dislikes.push(product);
            sessionStorage.setItem("account", JSON.stringify(account));
            window.alert("Product Disliked!");
        } 
    }

    saveProduct(product) {
        let account = JSON.parse(sessionStorage.getItem("account"));
        if(account.saved.find(x => (x === product))) {
            window.alert("Product already saved");
        }
        else {
            account.saved.push(product);
            sessionStorage.setItem("account", JSON.stringify(account));
            window.alert("Product Saved!");
        } 
    }

    render() {
        return <>
            <Product product={this.state.product} />
            {/* this.props.account.auth */}
            {sessionStorage.getItem("auth")
            ? <>
                <div className="card align-content-start">
                    <div>
                        <Button className="m-1"
                                 type="button" 
                                 onClick={e => this.addLike( window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1) /* this.state.product.name */ ) }>
                            Like
                        </Button>
                    </div>
                    <div>
                        <Button className="m-1"
                                type="button"
                                onClick={e => this.addDislike(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1) /* this.state.product.name */ )}>
                            Dislike
                        </Button>
                    </div>
                    <div>
                        <Button className="m-1"
                                type="button"
                                onClick={e => this.saveProduct(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1) /* this.state.product.name */ )}>
                            Save
                        </Button>
                    </div>
                    {/* <div>
                        <Button className="m-1" type="button">
                            Add to Recipe
                        </Button>
                    </div> */}
                </div>
                
            </>
            : <>
                <div>Login to see more features</div>
            </>
        }
        </>
    }

    // componentDidMount(name) {
    //     this.productRequests.getProductByName(name)
    //         .then(product => this.setState(product)
    //         .catch(alert(`No product with name ${name} in database :(`)));
    // }
}

export default ProductView;