import React from 'react';
import { AxiosRequests } from '../api';
import { Food } from '../models';
import { Product } from './Product';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Card, notification } from 'antd';
import { DislikeTwoTone, LikeTwoTone, StarTwoTone } from '@ant-design/icons';

export class ProductView extends React.Component {

    productRequests = new AxiosRequests();

    state = {
        product: '',
        found: false,
        foodGroup: ""
    }

    likeProduct(product) {
        if(window.sessionStorage.getItem("auth")) {
            let account = JSON.parse(sessionStorage.getItem("account"));
            let foodName = product.replace(/%20/g, ' ');
            this.productRequests.likeProduct(account.userId, foodName)
                .then(notification.success({
                    message: 'Product Liked!',
                    description: `Successfully liked the product ${this.state.product.foodName}. Go to your profile to view it.`
                }))
        }
        else {
            notification.error({
                message: 'Login to Like this Product',
                description:
                  'You must be logged in to like this product.',
              });
        }
    }

    dislikeProduct(product) {
        if(window.sessionStorage.getItem("auth")) {
            let account = JSON.parse(sessionStorage.getItem("account"));
            let foodName = product.replace(/%20/g, ' ');
            this.productRequests.dislikeProduct(account.userId, foodName)
                .then(notification.success({
                    message: 'Product Disliked!',
                    description: `Successfully disliked the product ${this.state.product.foodName}. Go to your profile to view it.`
                }))
        }
        else {
            notification.error({
                message: 'Login to Dislike this Product',
                description:
                  'You must be logged in to dislike this product.',
              });
        }
    }

    saveProduct(product) {
        if(window.sessionStorage.getItem("auth")) {
            let account = JSON.parse(sessionStorage.getItem("account"));
            let foodName = product.replace(/%20/g, ' ');
            this.productRequests.saveProduct(account.userId, foodName)
                .then(notification.success({
                    message: 'Product Saved!',
                    description: `Successfully saved the product ${this.state.product.foodName}. Go to your profile to view it.`
                }))
        }
        else {
            notification.error({
                message: 'Login to Save this Product',
                description:
                  'You must be logged in to save this product.',
              });
        }

    }

    handleDeleteProduct() {
        notification.open({
            key: "delete",
            message: `Are you sure you want to delete the product ${this.state.product.foodName} from the database?`,
            duration: 0,
            btn: <button type="button" className="btn btn-primary" size="small" onClick={e => { 
                    this.deleteProduct();
                    notification.close("delete"); }}>Confirm</button>
        })
    }

    deleteProduct() {
        let foodName = this.props.match.params.name;
        this.productRequests.deleteProduct(foodName)
            .then(() => {
                this.setState({ redirect: '/' });
                notification.success({
                    message: 'Product Deleted!',
                    placement: 'bottomRight'
                });
            });
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }

        return <div className="container">
            {this.state.product
            ? <>
                <Card id = "outerFoodCard" key={this.state.product.foodId} 
                      actions={ [<LikeTwoTone  id = "action" key="like"  onClick={ e => this.likeProduct( window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)) } />,    
                      <DislikeTwoTone id = "action" key="dislike" twoToneColor="#eb2f96" onClick={ e => this.dislikeProduct(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)) } />,
                      <StarTwoTone id = "action" key="star" twoToneColor="#f7db02" onClick={ e => this.saveProduct(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)) } />,] }>
                    <Product product={this.state.product} foodGroup={this.state.foodGroup} />
                </Card>
                
                {window.sessionStorage.getItem("admin")
                ? <>
                    <Link className="m-1 btn btn-warning"
                            to={`${window.location.pathname}/edit`} >
                        Edit Product
                    </Link>
                    <Button className="m-1 btn btn-danger float-right"
                            type="button" 
                            onClick={e => this.handleDeleteProduct() } >
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
            
        </div>
    }

    componentDidMount() {
        let foodName = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1).replace(/%20/g, ' ');
        this.productRequests.getProductByName(foodName)
            .then(product => {
                if(product.length > 0) {
                    this.setState({ product: new Food(product[0]), found: true });
                    this.productRequests.getFoodGroups()
                        .then(foodGroups => {
                            let foodGroup = foodGroups.find(x => x.id === this.state.product.foodGroupId); 
                            this.setState({ foodGroup: foodGroup.foodGroup });
                    });  
                }
            });
        
    }
}

export default ProductView;