import React from 'react';
import logo from '../logo2White.png';
import './App.css';

export const landingPage = props => {
  return (
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
        
          <img src={logo} alt="Logo" id = "bigLogo" />
    

       
    </section>
  </div>
  );
}

export default landingPage;