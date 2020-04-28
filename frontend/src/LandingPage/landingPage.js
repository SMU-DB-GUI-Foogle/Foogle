import React from 'react';
import logo from '../logo2White.png';


export const landingPage = props => {
  return <div id="pushLeftWhenSmall">
    <div id = "landingPage">
    
    <section id="main">
      <div className="main-text">
        <span>FOOGLE</span> <br /> Food at your <br />
        Fingertips.
      </div>
        
        <div id="hideImg"> 
          <img src={logo} alt="Logo" id = "bigLogo" />
        </div>

       
    </section>
  </div>
  </div>
}

export default landingPage;