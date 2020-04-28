import React from 'react';
import logo from '../logo2White.png';

export const backgroundPage = props => {
  return <div id="pushLeftWhenSmall">
    <div id = "landingPage">


    <section id="main">
      <div className="main-text">
        <span>FOOGLE</span> <br />  <br /> 
        
      </div>
        
      <div>
            <h1>PURPOSE</h1>

            <p>Foogle was created to give users control over their daily consumption. With Foogle, users can easily search foods and learn about their nutritional information.
              Learn more about our service on the "Get Started" page.
            </p>
            <img id = "bigLogo" src = {logo}></img>
      </div>
    
       
    </section>
  </div>
  </div>;
}

export default backgroundPage;