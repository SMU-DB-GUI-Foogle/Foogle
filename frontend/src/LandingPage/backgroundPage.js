import React from 'react';
import logo from '../logo2White.png';
import './App.css';

export const backgroundPage = props => {
  return (
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
        
      <div>
            <p>FOOGLE was started so that people could keep better track of the foods they consume!</p>
      </div>
    
       
    </section>
  </div>
  );
}

export default backgroundPage;