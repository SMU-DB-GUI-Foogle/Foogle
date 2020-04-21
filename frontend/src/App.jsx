import React from 'react';
import Routes from './Routes';
import { Nav, Navbar, Form, Button, Dropdown } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

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
      this.setState({search: true});
    }
  }

  keyPressed(event) {
    if (event.key === "Enter" && this.state.searchQuery !== "") {
      this.searchResult(event)
    }
  }

  handleLogout(e) {
    window.sessionStorage.removeItem("auth");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("account");
    window.sessionStorage.removeItem("admin");
    this.setState({ isAuthenticated: false });
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
        <Navbar id="nav" bg="dark" variant="dark" fluid="true" collapseOnSelect>
					<Navbar.Brand>
            <Link className="text-white" to="/">Foogle</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
            {/* <Nav className="m-auto">
              {!this.state.isAuthenticated && 
                <Nav.Link href="/login">Login</Nav.Link>}
              {this.state.isAuthenticated && 
                <Nav.Link href="/" onClick={this.handlelogout}>Logout</Nav.Link>}
              {this.state.isAuthenticated && 
                <Nav.Link href={`/profile/${window.sessionStorage.getItem("username")}`}>Profile</Nav.Link>}
            </Nav> */}

          
            <Navbar.Collapse>
              <Nav className="m-auto">
                {/* {this.state.isAuthenticated */}{sessionStorage.getItem("auth")
                  ? <>
                      <Navbar.Brand>
                        <Link className="text-white" to="/" onClick={ e => this.handleLogout(e) }>Logout</Link>
                      </Navbar.Brand>
                      <Navbar.Brand>
                        <Link className="text-white" to={`/${window.sessionStorage.getItem("username")}`}>Profile</Link>
                      </Navbar.Brand>
                    </>
                  : <>
                      {/* <Navbar.Brand>
                        <Link className="text-white" to="/register">Register</Link>
                      </Navbar.Brand> */}
                      <Navbar.Brand>
                        <Link className="text-white" to="/login">Login</Link>
                      </Navbar.Brand>
                    </>
                }
              </Nav>
            </Navbar.Collapse>
            <Form inline>
              <Form.Control type="text"
                            placeholder="Search for a Food"
                            className=" mr-sm-2"
                            value={this.state.searchQuery}
                            onChange={ e => this.setState({ searchQuery: e.target.value }) }
                            onKeyPress={ e => this.keyPressed(e) } />
              <Dropdown as={Button.Group}>
                <Button type="button"
                        onClick={ e => this.searchResult(e) }
                        disabled={ !(this.state.searchQuery.length > 0)}>
                          Search
                </Button>
                <Dropdown.Toggle split type="button" id="dropdown-split-basic" />
                <Dropdown.Menu alignRight>
                  <Dropdown.Item href="/search">Advanced Search</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
				</Navbar>
        <div className="container-fluid py-3 content">
          <Routes className="m-1" appProps={ this.state } />
        </div>
      </>
    );
  }

  componentDidUpdate() {

  }
}

export default App;

