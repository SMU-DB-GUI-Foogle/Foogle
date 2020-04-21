import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { Account } from '../models';
import loginImg from "../login.svg";
import { AxiosRequests } from "../api";

export const Register = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  let accountRequests = new AxiosRequests();

  function validateForm() {
      return firstName.length > 0 && lastName.length > 0 && email.length > 0 && username.length > 0 && password.length > 0;
  }

  function register(event) {
      const form = event.currentTarget;
      if(form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }

      accountRequests.register(firstName, lastName, email, username, password)
        .then(alert("Account Created!"));

      setRegistered(true);
  }

  if(props.isAuthenticated) {
      return (<Redirect to="/" push />);
  }

  if(registered) {
      return (<Redirect to="/" push />);
  }

  return <>
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Register for FOOGLE</div>
      <div className="content">
        {/* <div className="image">
          <img src={loginImg} />
        </div> */}
        <div className="form">
        <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text"
                   name="firstName"
                   placeholder="First Name"
                   value={firstName}
                   onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text"
                   name="lastName"
                   placeholder="Last Name"
                   value={lastName}
                   onChange={e => setLastName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email"
                   name="email"
                   placeholder="Email"
                   value={email}
                   onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text"
                   name="username"
                   placeholder="Username"
                   value={username}
                   onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password"
                   name="password"
                   placeholder="Password"
                   value={password}
                   onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button"
                className="btn"
                disabled={!validateForm()}
                onClick={ e => register(e) }>
          Register
        </button>
      </div>
    </div>
  </>
}

export default Register;