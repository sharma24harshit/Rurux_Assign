import React from 'react'
import Homepage from './Homepage'
import {Routes,Route} from "react-router-dom"
import AdminLogin from './Admin/AdminLogin'
import Admin from './Admin/Admin'
import StudentLogin from './Student/StudentLogin'
import Student from './Student/Student'
import AdminDashboard from './Admin/AdminDashboard'
import AdminAllStudents from './Admin/AdminAllStudents'
import StudentDashboard from './Student/StudentDashboard'
import StudentRegister from './Student/StudentRegister'
const Allroutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage/>} />

        <Route path="/admin" element={<Admin />}>
         <Route path="login" element={<AdminLogin />} />
         <Route path="dashboard" element={<AdminDashboard />} />
         <Route path='allStudents' element={<AdminAllStudents/>}/>
        </Route>

        <Route path="/student" element={<Student />}>
         <Route path="login" element={<StudentLogin />} />
         <Route path="register" element={<StudentRegister />} />
         <Route path="dashboard" element={<StudentDashboard />} />
        </Route>

    </Routes>
  )
}

export default Allroutes