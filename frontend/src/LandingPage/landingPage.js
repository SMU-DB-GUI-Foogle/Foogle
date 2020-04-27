import React from 'react';
import logo from '../logo2White.png';
import './App.css';

export const landingPage = props => {
  return <div id="pushLeftWhenSmall">
    <div id = "landingPage">
    <section>
      <header>
        <img src={logo} width="100" alt="Logo" />
        
      </header>
    </section>

    <section id="main">
      <div className="main-text">
        <span>FOOGLE</span> <br /> Food at your <br />
        fingertips.
      </div>
        
        <div id="hideImg"> 
          <img src={logo} alt="Logo" id = "bigLogo" />
        </div>

       
    </section>
  </div>
  </div>
}

export default landingPage;