import React from 'react';
import { AxiosRequests } from '../api';
import { Account } from '../models';
import { Profile } from './Profile';
import { LikesView } from './LikesView';
import { SavedView } from './SavedView';
import { DropdownButton, Dropdown, Form, Col, Button } from 'react-bootstrap';

export class ProfileView extends React.Component {

    productRequests = new AxiosRequests();

    state = {
        userAccount: new Account(),
        email: ''
    }

    render() {
        return <>
            <div className="jumbotron p-4">
                <Profile account={JSON.stringify(this.state.userAccount)} />
                <div className="row mt-2 mr-2">
                    <DropdownButton className="col-3" id="dropdown-basic-button" title="View Options">
                        <Dropdown.Item href={window.location.pathname + `/edit`}>Edit Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href={window.location.pathname + `/groups`} account={this.state.account}>Edit Groups</Dropdown.Item>
                        <Dropdown.Item href={window.location.pathname + `/recipes`}>Edit Recipes</Dropdown.Item>
                    </DropdownButton>

                    <Form className="card px-2 pt-2 col-9">
                        <Form.Group as={Form.Row} controlId="email">
                                <Form.Label column sm="5">Invite Someone to the Site</Form.Label>
                                <Col sm="7">
                                    <Form.Control type="email"
                                                  placeholder="Email"
                                                  value={this.state.email}
                                                  onChange={ e => this.setState({ email: e.target.value }) } />
                                </Col>
                                <Button className="ml-3"
                                        type="button"
                                        disabled={!(this.state.email.length > 0)}
                                        onClick={() => {window.alert("Invitation Sent"); this.setState({ email: '' }) } }>Send Invite</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>

            <div className="card p-2 m-2">
                <LikesView account={JSON.stringify(this.state.userAccount)} />
            </div>
            
            <div className="card p-2 m-2">
                <SavedView account={JSON.stringify(this.state.userAccount)} />
            </div>
        </>
    }

    // componentDidMount(userName) {
    //     this.productRequests.getProfileAccount(userName)
    //         .then(userAccount => this.setState(userAccount)
    //         .catch(alert(`No user with userName ${userName} in database :(`)));
    // }

}

export default ProfileView;