import React from 'react'
import { AxiosRequests } from '../api';
import { Link, Redirect } from 'react-router-dom';

export class ProfileEditor extends React.Component {

    profileRequests = new AxiosRequests();
    
    state = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    }

    validateForm() {
        return this.state.firstName.length > 0 && this.state.lastName.length > 0 &&
               this.state.email.length > 0 && this.state.username.length > 0;
    }

    onSubmit() {
        if(!(this.state.password || this.state.password2) || this.state.password == this.state.password2) {
            let account = JSON.parse(sessionStorage.getItem("account"));
            account.firstName = this.state.firstName;
            account.lastName = this.state.lastName;
            account.email = this.state.email;
            account.username = this.state.username;
            let password = account.password;
            if(this.state.password) {
                account.password = this.state.password;
                password = this.state.password;
            }
            window.alert("Profile information updated!")
            sessionStorage.setItem("account", JSON.stringify(account));
            sessionStorage.setItem("username", this.state.username);
            this.profileRequests.updateProfile(account.userId, this.state.firstName, this.state.lastName, this.state.email, this.state.username, password)
            this.setState({ redirect: "/" + account.username}) 
        }
        else {
            window.alert("Passwords do not match!")
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
        }

        return <div className="container">
            <form className="card p-3">
                <h1>Account Editor</h1>
                <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input type="text"
                        id="fname"
                        name="fname"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={ e => this.setState({ firstName: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text"
                        id="lname"
                        name="lname"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={ e => this.setState({ lastName: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={ e => this.setState({ email: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={this.state.username}
                        onChange={ e => this.setState({ username: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={ e => this.setState({ password: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password"
                        id="password2"
                        name="password2"
                        className="form-control"
                        value={this.state.password2}
                        onChange={ e => this.setState({ password2: e.target.value }) } />
                </div>

                <button type="button"
                        disabled={!this.validateForm()}
                        className="btn btn-primary btn-block"
                        onClick={ e => this.onSubmit() }>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to={`/${this.state.username}`}>
                    Return to Profile
                </Link>
                
            </form>
        </div>
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.setState({ firstName: account.firstName, 
                        lastName: account.lastName,
                        email: account.emailAddress,
                        username: account.username});        
    }
}

export default ProfileEditor;