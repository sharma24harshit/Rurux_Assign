import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const Student = () => {
  const nav = useNavigate();
  let token = JSON.parse(localStorage.getItem("userToken"));

  useEffect(()=>{
   if(token){
    nav("/student/dashboard");
   }
   else if(token=="" || token==undefined || token==null){
    nav("/student/login");
   }
  },[token])
  return (
    <Outlet /> 
  )
}

export default Student