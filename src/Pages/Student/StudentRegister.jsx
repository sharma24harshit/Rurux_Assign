import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRegister = () => {
    const [name, setname] = useState("");
    const [enrollmentID ,setenrollmentID] = useState("");
    const [year ,setyear] = useState("");
    const [field, setfield] = useState("");
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");

    const [show, setShow] = useState(false);
    const [toastBg, setToastBg] = useState('Primary');
    const [toastMsg, setToastMsg] = useState();

const [streamList ,setstreamList] = useState("");

    const nav = useNavigate();

    useEffect(()=>{
   fetchAllStreams()
    },[])

    const fetchAllStreams = async()=>{
        try {
            const res = await axios.get("https://gleaming-goat-shoulder-pads.cyclic.app/fields/allStreams");
         if(res.status===200){
            setstreamList(res?.data ? res?.data : []);
         }
        } catch (error) {
            console.log(error);
        }
    }
   
    const handleSubmit = async(e)=>{
   e.preventDefault();
   if(username === "" || password === "" || name==="" || enrollmentID==="" || year===""||field===""){
    setShow(true);
    setToastBg('Warning')
    setToastMsg('Please enter valid details');
    return
   }
   let obj={
    name, enrollmentID, year, field, username, password
   }
   try {
    const res = await axios.post(`https://gleaming-goat-shoulder-pads.cyclic.app/students/register`,obj);
    if(res.status===201){
     // console.log(res.data)
      localStorage.setItem('userData', JSON.stringify(res?.data ? res?.data?.data : {}));
      localStorage.setItem("userToken", JSON.stringify(res?.data ? res?.data?.token : ""));
      setShow(true);
      setToastBg('Success');
      setToastMsg('Registration Successfull');
      nav("/student/login");
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
          <div className='student_login_background'>
           <div className='student_login_container'>
           <h2>Student Register Form</h2>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">        
                <Form.Label>Enter Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setname(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">        
                <Form.Label>Enter EnrollmentID</Form.Label>
                <Form.Control type="number" placeholder="Enter enrollmentID" value={enrollmentID} onChange={(e)=>setenrollmentID(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">        
                <Form.Label>Enter Year</Form.Label>
                <Form.Control type="text" placeholder="Enter year" value={year} onChange={(e)=>setyear(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">        
                <Form.Label>Enter Stream</Form.Label>
               
                <Form.Select aria-label="Default select example" value={field} onChange={(e)=>setfield(e.target.value)}>
                <option value="" >Select Stream</option>
      {streamList && streamList.map((el)=>(
        <option value={el?.name}>{el?.name}</option>
      ))}
      
    </Form.Select>
              </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>USERNAME</Form.Label>
               <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
             </Form.Group>
       
             <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>PASSWORD</Form.Label>
               <Form.Control type="password" placeholder="Enter Password" 
               value={password} onChange={(e)=>setPassword(e.target.value)}/>
               <br />
               <Form.Label>Already Registered ? 
                <Link to="/student/login" > Login</Link>
                 </Form.Label>
             </Form.Group>
             <Button variant="primary" type="submit" onClick={handleSubmit} >
             Register
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

export default StudentRegister