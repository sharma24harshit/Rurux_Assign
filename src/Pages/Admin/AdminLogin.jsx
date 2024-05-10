import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
 const [username ,setUsername] = useState("");
 const [password ,setPassword] = useState("");
 const [show, setShow] = useState(false);
 const [toastBg, setToastBg] = useState('Primary');
 const [toastMsg, setToastMsg] = useState();
 const nav = useNavigate();

 const handleSubmit = (e)=>{
e.preventDefault();
if(username === "admin" && password === "admin"){
    setShow(true);
    setToastBg('Success');
    setToastMsg('Login Successfull');
    nav("/admin/dashboard");
    setUsername("");
    setPassword("");
}
else{
    setShow(true);
    setToastBg('Warning')
    setToastMsg('Incorrect Username or passsword. Please Check');
}
 }

    return (
       <div className='admin_login_background'>
        <div className='admin_login_container'>
        <h2>Admin Sign In</h2>
         <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>USERNAME</Form.Label>
            <Form.Control type="email" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>PASSWORD</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit} >
          Sign In
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

export default AdminLogin