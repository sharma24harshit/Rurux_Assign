import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import StudentNavbar from '../../Components/StudentNavbar';
import StudentDetails from '../../Components/StudentDetails';
import axios from 'axios';
import WebSocket from '../../Components/WebSocket';

const StudentDashboard = () => {
  const [userDetails ,setuserDetails] = useState({});
const nav = useNavigate();
let studentData = JSON.parse(localStorage.getItem("userData"));

  useEffect(()=>{
    if(studentData?._id){
      getUserInfo(studentData?._id);
    }
  },[])

  const getUserInfo = async(ID)=>{
    try {
      const res = await axios.get(`https://gleaming-goat-shoulder-pads.cyclic.app/students/${ID}`);
   if(res.status==200){
    setuserDetails(res?.data?.data);
    //  console.log("student detail",res?.data?.data);
   }
  } catch (error) {
      console.log(error);
  }
  }

  return (
    <div>
      <WebSocket/>
      <StudentNavbar/>
      <StudentDetails data={userDetails} />
    </div>
  )
}

export default StudentDashboard