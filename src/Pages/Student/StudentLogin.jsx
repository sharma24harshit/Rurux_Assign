import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link, useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [username ,setUsername] = useState("");
  const [password ,setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [toastBg, setToastBg] = useState('Primary');
  const [toastMsg, setToastMsg] = useState();
  const nav = useNavigate();
 
  const handleSubmit = async(e)=>{
 e.preventDefault();
 if(username === "" || password === ""){
  setShow(true);
  setToastBg('Warning')
  setToastMsg('Please enter valid username and password');
  return
 }
 let obj={
  username,password
 }
 try {
  const res = await axios.post(`https://gleaming-goat-shoulder-pads.cyclic.app/students/login`,obj);
  if(res.status===200){
   // console.log(res.data)
    localStorage.setItem('userData', JSON.stringify(res?.data ? res?.data?.data : {}));
    localStorage.setItem("userToken", JSON.stringify(res?.data ? res?.data?.token : ""));
    setShow(true);
    setToastBg('Success');
    setToastMsg('Login Successfull');
    nav("/student/dashboard");
    setUsername("");
    setPassword("");
  }
 } catch (error) {
  setShow(true);
  setToastBg('Warning')
  setToastMsg('Error encountered while logging In.');
 }
  }
 
     return (
        <div className='admin_login_background'>
         <div className='admin_login_container'>
         <h2>Student Login</h2>
          <Form>
           <Form.Group className="mb-3" controlId="formBasicEmail">
             <Form.Label>USERNAME</Form.Label>
             <Form.Control type="email" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
           </Form.Group>
     
           <Form.Group className="mb-3" controlId="formBasicPassword">
             <Form.Label>PASSWORD</Form.Label>
             <Form.Control type="password" placeholder="Enter Password" 
             value={password} onChange={(e)=>setPassword(e.target.value)}/>
             <br />
             <Form.Label>New User ? 
              <Link to="/student/register" > Click to Register</Link>
               </Form.Label>
           </Form.Group>
           <Button variant="primary" type="submit" onClick={handleSubmit} >
           Login
           </Button>
         </Form>
        </div>
        <ToastContainer
           className="p-3"
           position='bottom-center'
           style={{ zIndex: 1 }}
         >
        <Toast onClose={() => setShow(false)} show={show} delay={3000}  bg={toastBg} autohide>
           <Toast.Header>
             <strong className="me-auto">Message</strong>
           </Toast.Header>
           <Toast.Body>{toastMsg}</Toast.Body>
         </Toast>
         </ToastContainer>
        </div>
       );
}

export default StudentLogin