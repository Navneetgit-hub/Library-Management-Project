
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './AddCategory.css';


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
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}  className="menu">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="menubar">
                <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/admin" className="menu">Home</Nav.Link>
                  <Nav.Link href="/addBook" className="menu">Add Book</Nav.Link>
                  <Nav.Link href="/adminbooklist" className="menu">Books List</Nav.Link>
                  <Nav.Link href="/userdetails" className="menu">User Details</Nav.Link>
                  <Nav.Link href="/charts" className="menu">Charts</Nav.Link>
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