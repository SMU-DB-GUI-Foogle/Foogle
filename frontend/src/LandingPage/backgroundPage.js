import React from 'react';
import logo from '../logo2White.png';
import { Link } from 'react-router-dom';

export const backgroundPage = props => {
  return <div id="pushLeftWhenSmall">
    <div id = "landingPage">


    <section id="main">
      <div className="main-text">
        <span>FOOGLE</span> <br />  <br /> 
        
      </div>
        
      <div id = "purpose">
            <h1>PURPOSE</h1>
            <p>Foogle was created to give users control over their daily consumption. With Foogle, users can easily search foods and learn about their nutritional information.
              Learn more about our service on the <Link to = "/gettingStarted"> Get Started </Link>  page.
            </p>
              <img id = "bigLogo2" src = {logo}></img>
      </div>
    
       
    </section>
  </div>
  </div>;
}

export default backgroundPage;