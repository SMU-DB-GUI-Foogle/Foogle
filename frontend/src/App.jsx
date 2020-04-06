import React from 'react';
import Routes from './Routes';
import { Nav, Navbar } from 'react-bootstrap';
import { Account } from './models';


class App extends React.Component{
  state = {
    isAuthenticated: false,
    userHasAuthenticated: x => this.setState({ isAuthenticated: x }),
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
					<Navbar.Brand href="/">Foogle</Navbar.Brand>
            <Nav className="ml-auto">
              {!this.state.isAuthenticated && 
                <Nav.Link href="/login">Login</Nav.Link>}
              {this.state.isAuthenticated && 
                <Nav.Link href="/login">Logout</Nav.Link>}
            </Nav>
            
				</Navbar>
        <Routes appProps={ this.state } />
      </>
    );
  }
}

export default App;

