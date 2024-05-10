import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../Components/AdminNavbar';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const AdminAllStudents = () => {
  const [data,setData] = useState([]);

  useEffect(()=>{
    fetchData();
   },[])
// fetching data on mounting
   const fetchData = async()=>{
    try {
        const res = await axios.get("https://gleaming-goat-shoulder-pads.cyclic.app/students/allStudents");
     if(res.status==200){
      setData(res?.data);
        console.log("All students",res.data);
     }
    } catch (error) {
        console.log(error);
    }

   }
  return (
    <div>
        <AdminNavbar/>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.NO</th>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Student Field</th>
          <th>Student Subjects & Marks</th>
          <th>Add Subject</th>
        </tr>
      </thead>
      <tbody>
      {data && data.map((el,i)=>(
         <tr>
          <td>{i+1}</td>
          <td>{el?.enrollmentID}</td>
          <td>{el?.name}</td>
          <td  >{el?.field}</td>
          <td  >{}</td>
          <td> <Button variant="primary">Add Subject and Marks</Button></td>
         </tr>
          ))}
      </tbody>
    </Table>
    </div>
  )
}

export default AdminAllStudents