import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import './Book.css';

function UserNav() {
  return (
    <div id="usernav">
      {["xxl"].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Books
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body className="menubar">
                <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/user" className="menu">
                    Home
                  </Nav.Link>
                  <Nav.Link href="/userRequested"  className="menu">Requested book</Nav.Link>

                  <Nav.Link href="/userIssued" className="menu">
                    Issued book
                  </Nav.Link>

                  
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>

            <Navbar.Brand href="/">Logout</Navbar.Brand>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default UserNav;
