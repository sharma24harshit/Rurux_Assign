import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const StudentNavbar = () => {
    const [userName ,setuserName] = useState("");
const nav = useNavigate();

useEffect(()=>{
    let studentData = JSON.parse(localStorage.getItem("userData"));
    if(studentData?.name){
        setuserName(studentData?.name);
    }
   // console.log(studentData);
},[])

    const handleLogout = ()=>{
        localStorage.removeItem("userData");
        localStorage.removeItem("userToken");
        nav("/student/login")
    }

  return (
    <Navbar bg="primary" data-bs-theme="dark" className='adminNavbar'>
        <Container>
          <Navbar.Brand href="/student/dashboard">Dashboard</Navbar.Brand>
          <Navbar.Brand href="/student/dashboard">Welcome {"    "}
          {userName ? userName.toUpperCase() : "user"}
          </Navbar.Brand>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>
  )
}

export default StudentNavbar