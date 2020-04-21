import React from 'react';
import { AxiosRequests } from '../api';
import { Profile } from './Profile';
import { LikesView } from './LikesView';
import { SavedView } from './SavedView';
import { DropdownButton, Dropdown, Form, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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

    deleteSaved(foodName) {
        if(window.confirm("Are you sure you want to delete this saved product from your profile?")) {
            let account = JSON.parse(sessionStorage.getItem('account'));
            this.profileRequests.deleteSavedProduct(account.userId, foodName)
            .then(() => {
                this.setState({ 
                    saves: this.state.saves.filter(x => x.foodName !== foodName)
                });
                alert("Saved Product Removed");
            });
        }
    }

    deleteLiked(foodName) {
        if(window.confirm("Are you sure you want to delete this liked product from your profile?")) {
            let account = JSON.parse(sessionStorage.getItem('account'));
            this.profileRequests.deleteLikedProduct(account.userId, foodName)
            .then(() => {
                this.setState({ 
                    likes: this.state.likes.filter(x => x.foodName !== foodName)
                });
                alert("Liked Product Removed");
            });
        }
    }

    deleteDisliked(foodName) {
        if(window.confirm("Are you sure you want to delete this disliked product from your profile?")) {
            let account = JSON.parse(sessionStorage.getItem('account'));
            this.profileRequests.deleteDislikedProduct(account.userId, foodName)
            .then(() => {
                this.setState({ 
                    dislikes: this.state.dislikes.filter(x => x.foodName !== foodName)
                });
                alert("Disliked Product Removed");
            });
        }
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to={ this.state.redirect }/>);
        }

        return <>
            <div className="jumbotron p-4">
                <Profile saves={this.state.saves} likes={this.state.likes} dislikes={this.state.dislikes} recipes={this.state.recipes} />
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
                <LikesView deleteLiked={name => this.deleteLiked(name)} likes={this.state.likes} deleteDisliked={name => this.deleteDisliked(name)} dislikes={this.state.dislikes} />
            </div> 
            
            <div className="card p-2 m-2">
                <SavedView deleteSaved={name => this.deleteSaved(name)} saves={this.state.saves} />
            </div> 

            <Button className="btn-danger" type="button" onClick={e => this.deleteAccount() }>Delete Account</Button>
        </>
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