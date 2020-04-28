import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import loginImg from "../login.svg";
import logo from '../logoTrueGreen.jpg';
import { AxiosRequests } from '../api'
import { notification } from 'antd';

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
                  notification.error({
                    message: 'Invalid Username and/or Password!',
                    placement: 'bottomRight'
                  });
                  setEmail("");
                  setPassword("");
                  return;
              }

              window.sessionStorage.setItem("account", JSON.stringify(account[0]));
              window.sessionStorage.setItem("auth", true);
              window.sessionStorage.setItem("username", account[0].username);
              if(account[0].isAdmin) {
                window.sessionStorage.setItem("admin", true);
              }
              notification.success({
                message: 'Login Successful!',
                description: `Click 'Profile' or 'Search a Food' to see more!`,
                placement: 'bottomRight'
              });
              props.userHasAuthenticated(true);
            })
      }
      catch(e) {
          alert(e.message)
      }

  }

  if(props.isAuthenticated) {
      return (<Redirect to="/" push/>);
  }


  return <>
  
    <div className="base-container" ref={props.containerRef}>
      <div id="inForm" className="header"><h3 >LOGIN</h3></div>
      <div className="">
        <div className="image">
          <img id = "greenLogo" src={logo} />
        </div>
        <div className="form">
          <div className="form-group">
            <label id="inForm" htmlFor="email" className="mr-2">Email: </label>
            <input type="email"
                   name="email"
                   placeholder="Email"
                   value={email}
                   onChange={ e => setEmail(e.target.value) } />
          </div>
          <div className="form-group">
            <label id="inForm" htmlFor="password" className="mr-2">Password:</label>
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