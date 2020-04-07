import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Account } from '../models';

export const Register = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registered, setRegistered] = useState(false);

    function validateForm() {
        return firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0;
    }

    function register(event) {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        let account = new Account(
            firstName, 
            lastName, 
            email,
            password);

        //local stoarge statements used for local testing till axios requests can be used
        if (!localStorage.getItem('accounts')) {
            localStorage.setItem('accounts', JSON.stringify([]));
        }

        let accounts = JSON.parse(localStorage.getItem('accounts'));
        accounts.push(account);
        localStorage.setItem('accounts', JSON.stringify(accounts));

        setRegistered(true);
    }

    if(props.isAuthenticated) {
        return (<Redirect to="/" push />);
    }

    if(registered) {
        return (<Redirect to="/login" push />);
    }

    return(
        <>
            <div className="Register">
                <form>
                    <Form.Group as={Form.Row} controlId="horizontalFirstName">
                        <Form.Label column sm={2}>
                            First Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" 
                                          placeholder="First Name"
                                          value={firstName}
                                          onChange={e => setFirstName(e.target.value)}
                            />
                        </Col>
                    </Form.Group> 

                    <Form.Group as={Form.Row} controlId="horizontalLastName">
                        <Form.Label column sm={2}>
                            Last Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text"
                                          placeholder="Last Name" 
                                          value={lastName}
                                          onChange={e => setLastName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Form.Row} controlId="formHorizonalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email"
                                          placeholder="Email"
                                          value={email}
                                          onChange={e => setEmail(e.target.value)}
                            />
                        </Col>
                    </Form.Group>    

                    <Form.Group as={Form.Row} controlId="formHorizonalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          value={password}
                                          onChange={e => setPassword(e.target.value)}
                            />
                        </Col>
                    </Form.Group> 

                    <Button block bsSize="large"
                            disabled={!validateForm()}
                            type="button"
                            onClick={ e => register(e) }>
                        Register
                    </Button>
                </form>
            </div>
        </>
    );
}

export default Register;