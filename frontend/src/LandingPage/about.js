import React from 'react';
import logo from '../logo2White.png';
import './App.css';

export const about = props => {
  return (
    <div id = "landingPage">
    <section>
      <header>
        <img src={logo} width="100" alt="Logo" />
        
      </header>
    </section>

    <section id="main">
      <div className="main-text">
        <span>FOOGLE BASICS</span> <br />  <a color = "#00FA9A" href = "gettingStarted"> Get Started </a> <br />
        <a href = "backgroundPage"> Explore</a>
      </div>
        
    
          
    

       
    </section>
  </div>
  );
}

export default about;