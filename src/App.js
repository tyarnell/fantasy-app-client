import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";

function App(props) {
  return (
    <div className="App container">
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Navbar.Brand as={Link} to="/">
          Urban Baffoon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
