import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./App.css";
import Routes from "./Routes";

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar bg="light" expand="lg" collapseOnSelect>
          <Navbar.Brand as={Link} to="/">
            Urban Baffoon
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isAuthenticated ? (
                <Fragment>
                  <Nav.Item onClick={handleLogout} href="/">
                    <Nav.Link as={Link} to="/">
                      Logout
                    </Nav.Link>
                  </Nav.Item>
                </Fragment>
              ) : (
                <Fragment>
                  <Nav.Item href="/signup">
                    <Nav.Link as={Link} to="/signup">
                      Sign-Up
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item href="/login">
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </Nav.Item>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    )
  );
}

export default withRouter(App);
