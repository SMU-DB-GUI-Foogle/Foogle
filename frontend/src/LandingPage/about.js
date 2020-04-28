import React from 'react';
import logo from '../logo2White.png';
import logoChef from '../logoCookBook.png'


export const about = props => {
  return (
    <div id = "landingPage">


    <section id="main">
      <div className="main-text">
        <span>FOOGLE BASICS</span> <br />  <a color = "#00FA9A" href = "gettingStarted"> Get Started </a> <br />
        <a href = "backgroundPage"> Explore</a>
      </div>

      <div id="hideImg">
        <img id = "aboutImg" src = {logoChef}></img>
      </div> 
    
          
    

       
    </section>
  </div>
  );
}

export default about;