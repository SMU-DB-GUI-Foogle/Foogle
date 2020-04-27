import React from 'react';
import logo from '../logo2White.png';
import './App.css';
import { Food } from '../models';
import { Product } from '../Products';
import { AxiosRequests } from '../api';

export class gettingStarted extends React.Component {

  state = {
    product: []
  }

  productRequests = new AxiosRequests();

  render() {
    return <div id="pushLeftWhenSmall">
      <div id = "landingPage">
      <section>
        <header>
          <img src={logo} width="100" alt="Logo" />
          
        </header>
      </section>

      <section id="main">
        <div className="main-text">
          <span>FOOGLE</span> <br />  <br />
          
        </div> 
        <div id = "howTo">
              <ul>
                <li>To start, create and account by going to LOGIN->REGISTER!</li>
                <li>Once you have an account, try searching for a food by entering a term into the search bar!</li>
                <li>Once you find a food you want to interact with, you can choose between these</li>
                <ul>
                    <button id = "buttonRules">Like</button>
                    <button id = "buttonRules">Save</button>
                    <button id = "buttonRules">Dislike</button>
                </ul>
                <li>You can keep track of foods you have interacted with on your PROFILE page!</li>
                <li>For example, here is the most recently added food on the site!</li>
              </ul>
              
            <div className="text-dark">
              <Product product={this.state.product} />
            </div>
        </div>

        
      
        
      </section>
    </div>
    </div>
  }

  componentDidMount() {
    this.productRequests.getAllProducts()
    .then(products => { debugger;
      this.productRequests.getProductByName(products[products.length - 1].foodName)
        .then(product => { debugger;
          this.setState({ product: new Food(product[0]) })
        })
    })
  }

}

export default gettingStarted;