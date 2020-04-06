import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

export const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCred, setInvalidCred] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function login(event) {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        //local stoarge statements used for local testing till axios requests can be used
        let accounts = JSON.parse(localStorage.getItem('accounts'));
        let userAccount = accounts.find(x => (x.email === email && x.password === password));

        if (!(email && password) || !userAccount) {
            setInvalidCred(true);
            return;
        }

        props.userHasAuthenticated(true);

    }

    if(props.isAuthenticated) {
        return (<Redirect to="/" push/>);
    }

    return (
        <>
            <div className="Login">
                <form onSubmit={ e => login(e) }>
                    { invalidCred && 
                    <p className="alert alert-danger">
                        Invalid email or password
                    </p> }
                    <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            
                        />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!validateForm()} type="submit">
                        Login
                    </Button>
                    <div>
                        <a href="/register">Register for an Account</a>
                    </div>
                </form>
            </div>
            
        </>
    );
}

export default Login;