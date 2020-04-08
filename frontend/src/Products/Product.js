import React from 'react';
import { Button } from 'react-bootstrap';

export const Product = props => {

    return <>
        Here is a Product
        {sessionStorage.getItem("auth")
            ? <>
                <div className="card align-content-start">
                    <div><Button className="m-1" type="button">Like</Button></div>
                    <div><Button className="m-1" type="button">Dislike</Button></div>
                    <div><Button className="m-1" type="button">Save</Button></div>
                    <div><Button className="m-1" type="button">Add to Recipe</Button></div>
                </div>
                
            </>
            : <>
                <div>Login to see more features</div>
            </>
        }
        
    </>

}

export default Product;