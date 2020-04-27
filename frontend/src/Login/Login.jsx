import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import loginImg from "../login.svg";
import { AxiosRequests } from '../api'

export const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCred, setInvalidCred] = useState(false);

  var accountRequests = new AxiosRequests();

  function validateForm() {
      return email.length > 0 && password.length > 0;
  }

  function login(event) {

      const form = event.currentTarget;
      if(form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }

      try {
          accountRequests.login(email, password)
            .then(account => {
              if (account.length == 0) {
                  setInvalidCred(true);
                  alert("Invalid email and/or password");
                  return;
              }

              window.sessionStorage.setItem("account", JSON.stringify(account[0]));
              window.sessionStorage.setItem("auth", true);
              window.sessionStorage.setItem("username", account[0].username);
              if(account[0].isAdmin) {
                window.sessionStorage.setItem("admin", true);
              }
              // else {
              //   window.sessionStorage.setItem("admin", false);
              // }
              props.userHasAuthenticated(true);
            })

          // //local stoarge statements used for local testing till axios requests can be used
          // let accounts = JSON.parse(localStorage.getItem('accounts'));
          // let userAccount = accounts.find(x => (x.email === email && x.password === password));

          // if (!(email && password) || !userAccount) {
          //     setInvalidCred(true);
          //     return;
          // }

          // props.userHasAuthenticated(true);
          // window.sessionStorage.setItem("auth", true);
          // window.sessionStorage.setItem("username", userAccount.username);
          // window.sessionStorage.setItem("account", JSON.stringify(userAccount));
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
      <div id="inForm" className="header"><h3>Login to FOOGLE</h3></div>
      <div className="">
        {/* <div className="image">
          <img src={loginImg} />
        </div> */}
        <div className="form">
          <div className="form-group">
            <label id="inForm" htmlFor="email">Email</label>
            <input type="email"
                   name="email"
                   placeholder="Email"
                   value={email}
                   onChange={ e => setEmail(e.target.value) } />
          </div>
          <div className="form-group">
            <label id="inForm" htmlFor="password">Password</label>
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