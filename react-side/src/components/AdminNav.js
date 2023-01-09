
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


function AdminNav() {
  return (
    <div id="Navbar-sidebar">
      {['xxl'].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
          <Container fluid>
          
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link href="/addBook">Add Book</Nav.Link>
                  <Nav.Link href="/adminbooklist">Books List</Nav.Link>
                  <Nav.Link href="/userdetails">User Details</Nav.Link>
                  <Nav.Link href="/charts">Charts</Nav.Link>
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

export default AdminNav;