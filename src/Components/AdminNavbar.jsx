import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AdminNavbar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" className='adminNavbar'>
        <Container>
          <Navbar.Brand href="/admin/dashboard">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/admin/allStudents">All Students</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default AdminNavbar