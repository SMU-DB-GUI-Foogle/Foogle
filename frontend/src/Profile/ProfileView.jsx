import React from 'react';
import { AxiosRequests } from '../api';
import { Profile } from './Profile';
import { DropdownButton, Dropdown, Form, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';

export class ProfileView extends React.Component {

    profileRequests = new AxiosRequests();

    state = {
        email: '',
        saves: [],
        likes: [],
        dislikes: [],
        recipes: []
    }

    deleteAccount() {
        if(window.confirm("Are you sure you want to delete youy account?")) {
            if(window.confirm("Deleting your account will result in loss of all your data.")) {
                if(window.confirm("Delete account?")) {
                    let account = JSON.parse(sessionStorage.getItem('account'));
                    this.profileRequests.deleteAccount(account.userId)
                    .then(() => {
                        window.sessionStorage.removeItem("auth");
                        window.sessionStorage.removeItem("username");
                        window.sessionStorage.removeItem("account");
                        window.sessionStorage.removeItem("admin");
                        this.setState({ saves: [], redirct: '/' });
                        this.props.userHasAuthenticated(false);
                        alert("Account Deleted :(");
                    });
                }
            }
        }
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to={ this.state.redirect }/>);
        }

        return <div className="container d-flex flex-wrap">
            <div className="card px-4 py-3 col-12 mb-2">
                <Profile saves={this.state.saves} likes={this.state.likes} dislikes={this.state.dislikes} recipes={this.state.recipes} />
                <div className="row mt-2 mr-2 align-items-center">
                    <DropdownButton className="px-2 pt-2 mb-2 col-sm-3 col-md-4" id="buttonRules" title="View Options">
                        <Dropdown.Item href={window.location.pathname + `/edit`}>Edit Profile</Dropdown.Item>
                        <Dropdown.Item href={window.location.pathname + `/recipes`}>Edit Recipes</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href={window.location.pathname + `/likes`}>View Likes/Dislikes</Dropdown.Item>
                        <Dropdown.Item href={window.location.pathname + `/saved`}>View Saved</Dropdown.Item>
                    </DropdownButton>

                    <Form className="card px-2 pt-2 col-sm-2 col-md-8">
                        <Form.Group as={Form.Row} controlId="email">
                                <Form.Label column sm="4">Invite Someone to the Site</Form.Label>
                                <Col sm="7">
                                    <Form.Control type="email"
                                                  placeholder="Email"
                                                  value={this.state.email}
                                                  onChange={ e => this.setState({ email: e.target.value }) } />
                                </Col>
                                <Button sm="1"
                                        className="ml-2"
                                        id = "buttonRules"
                                        type="button"
                                        disabled={!(this.state.email.length > 0)}
                                        onClick={() => {window.alert("Invitation Sent"); this.setState({ email: '' }) } }>
                                    <SendOutlined className="align-middle" />
                                </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>

            <Button className="btn-danger" type="button" onClick={e => this.deleteAccount() }>Delete Account</Button>
        </div>
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.profileRequests.getAccountSaves(account.username, account.userId)
            .then(saves => this.setState({ saves }));
        this.profileRequests.getAccountLikes(account.username, account.userId)
            .then(likes => this.setState({ likes }));
        this.profileRequests.getAccountDislikes(account.username, account.userId)
            .then(dislikes => this.setState({ dislikes }));
        this.profileRequests.getAccountRecipes(account.username, account.userId)
            .then(recipes => this.setState({ recipes }));
    }

}

export default ProfileView;