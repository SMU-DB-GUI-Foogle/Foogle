import React from 'react';
import Routes from './Routes';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class App extends React.Component{
  state = {
    isAuthenticated: false,
    userHasAuthenticated: x => this.setState({ isAuthenticated: x }),
    search: false,
    searchQuery: ""
  }

  searchResult(e) {
    const form = e.currentTarget;
    if(form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else {
      this.setState({search: true})
    }
  }

  render() {

    if(this.state.search)
    {
      let redirectURL = `/product/${this.state.searchQuery}`;
      this.setState({ searchQuery: "" });
      this.setState({ search: false });
      return(<Redirect to={redirectURL} />);
    }

    return (
      <>
        <Navbar bg="dark" variant="dark">
					<Navbar.Brand href="/">Foogle</Navbar.Brand>
            <Nav className="m-auto">
              {!this.state.isAuthenticated && 
                <Nav.Link href="/login">Login</Nav.Link>}
              {this.state.isAuthenticated && 
                <Nav.Link href="/login">Logout</Nav.Link>}
            </Nav>
            <Form inline>
              <Form.Control type="text"
                            placeholder="Search for a Food"
                            className=" mr-sm-2"
                            value={this.state.searchQuery}
                            onChange={ e => this.setState({ searchQuery: e.target.value }) } />
              <Button type="button"
                      onClick={ e => this.searchResult(e) }>
                Search
              </Button>
            </Form>
				</Navbar>
        <Routes appProps={ this.state } />
      </>
    );
  }
}

export default App;

