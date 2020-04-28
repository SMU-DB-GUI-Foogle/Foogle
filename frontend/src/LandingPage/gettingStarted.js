import React from 'react';
import logo from '../logo2White.png';
import { Food } from '../models';
import { Product } from '../Products';
import { AxiosRequests } from '../api';
import { DislikeTwoTone, LikeTwoTone, StarTwoTone } from '@ant-design/icons';

export class gettingStarted extends React.Component {

  state = {
    product: [],
    foodGroup: ""
  }

  productRequests = new AxiosRequests();

  render() {
    return <div id="pushLeftWhenSmall">
      <div id = "landingPage">


      <section id="main">
        <div className="main-text">
          <span>FOOGLE</span> <br />  <br />
          
        </div> 
        <div id = "howTo">
              <ul>
                <li>To start, create an account by going to LOGIN</li>
                  <ul id = "nestedList">
                    <li>If you already have an account, simply login</li>
                    <li>If you don't, register!</li>
                  </ul>
                <li>Once you have an account, try searching for a food by entering a term into the search bar!</li>
                  <ul id = "nestedList">
                    <li>You can do a simple search with the exact name</li>
                    <li>An advanced search can help you find a food based on our grouping sytems!</li>
                  </ul> 
               <li>For example, here is the most recently added food on the site!</li>
              </ul>
                 <div className="text-dark">
                   <Product product={this.state.product} foodGroup={this.state.foodGroup} />
                 </div>
                <li>Once you find a food you want to interact with, you can choose between these</li>
                <ul>
                    <li><h4>LIKE</h4><LikeTwoTone  id = "action" key="like"  /> </li>
                    <li><h4>DISLIKE</h4><DislikeTwoTone id = "action" key="dislike" twoToneColor="#eb2f96" /></li>
                    <li><h4>SAVE</h4><StarTwoTone id = "action" key="star" twoToneColor="#f7db02" /></li>
                </ul>
                <li>You can keep track of foods you have interacted with on your PROFILE page!</li>
                <li>You can also make recipes from your PROFILE page!</li>
            
        </div>

        
      
        
      </section>
    </div>
    </div>
  }

  componentDidMount() {
    this.productRequests.getAllProducts()
    .then(products => { 
      this.productRequests.getProductByName(products[products.length - 1].foodName)
        .then(product => { 
          this.setState({ product: new Food(product[0]) })
          this.productRequests.getFoodGroups()
            .then(foodGroups => {
                let foodGroup = foodGroups.find(x => x.id === this.state.product.foodGroupId); 
                this.setState({ foodGroup: foodGroup.foodGroup });
            });
        })
    })
    
  }

}

export default gettingStarted;