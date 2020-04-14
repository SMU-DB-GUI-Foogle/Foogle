import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import loginImg from "../login.svg";

export const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCred, setInvalidCred] = useState(false);

  function validateForm() {
      return email.length > 0 && password.length > 0;
  }

  async function login(event) {
      const form = event.currentTarget;
      if(form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }

      try {
          //local stoarge statements used for local testing till axios requests can be used
          let accounts = JSON.parse(localStorage.getItem('accounts'));
          let userAccount = accounts.find(x => (x.email === email && x.password === password));

          if (!(email && password) || !userAccount) {
              setInvalidCred(true);
              return;
          }

          props.userHasAuthenticated(true);
          window.sessionStorage.setItem("auth", true);
          window.sessionStorage.setItem("username", userAccount.username);
          window.sessionStorage.setItem("account", JSON.stringify(userAccount));
      }
      catch(e) {
          alert(e.message)
      }

  }

  if(props.isAuthenticated /*window.sessionStorage.getItem("auth")*/) {
      return (<Redirect to="/" push/>);
  }


  return <>
  
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login to FOOGLE</div>
      <div className="content">
        {/* <div className="image">
          <img src={loginImg} />
        </div> */}
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email"
                   name="email"
                   placeholder="Email"
                   value={email}
                   onChange={ e => setEmail(e.target.value) } />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password"
                   name="password"
                   placeholder="Password"
                   value={password}
                   onChange={ e => setPassword(e.target.value) } />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button"
                className="btn"
                disabled={!validateForm()}
                onClick={ e => login(e) }>
          Login
        </button>
      </div>
    </div>-
  </>
}

export default Login;