import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../Components/AdminNavbar';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Badge from 'react-bootstrap/Badge';

const AdminAllStudents = () => {
  const [data,setData] = useState([]);
  const [allSubjectsObj, setAllSubjectsObj] = useState([]);
  const [dropDownSubjects, setDropDownSubjects] = useState([]);
// Modal variables start
const [showModal, setShowModal] = useState(false);
const [subjectValue ,setSubjectValue] = useState("");
const [marks ,setMarks] = useState("");
const [studentID ,setStudentID] = useState("");
// const [modalType, setModalType] = useState("Add");

// Modal variables end

// Modal2 variables start
const [showModal2, setShowModal2] = useState(false);
const [subjectValue2 ,setSubjectValue2] = useState("");
const [NewMarks ,setNewMarks] = useState("");
const [prevMarks ,setPrevMarks] = useState(0);
// const [modalType, setModalType] = useState("Add");

// Modal2 variables end

//  toast variables start
const [showToast, setShowToast] = useState(false);
const [toastBg, setToastBg] = useState('Primary');
const [toastMsg, setToastMsg] = useState();
//  toast variables end
  useEffect(()=>{
    fetchData();
    getAllStreamSubjects();
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

  const getAllStreamSubjects = async () => {
    try {
      const res1 = await axios.get("https://gleaming-goat-shoulder-pads.cyclic.app/subjects/allSubjects");
   if(res1.status===200){
     // console.log(res1.data);
      try {
          const res2 = await axios.get("https://gleaming-goat-shoulder-pads.cyclic.app/fields/allStreams");
       if(res2.status===200){
         // console.log(res2.data); 
          filterAndMapData(res1.data, res2.data);
       }
      } catch (error) {
          console.log(error);
      }
  
   }
  } catch (error) {
      console.log(error);
  }}

  // mapping of  field data and subjects
  function filterAndMapData(data1, data2) {
    let arr=[];
    for(let i=0 ; i<data2.length; i++){
     let obj={};
     obj.field = data2[i].name;
     obj.field_id = data2[i]._id;  let subArray=[];
     for(let j=0; j<data1.length; j++){
         if(data1[j].stream == data2[i]._id){
             subArray.push({subjectId:data1[j]._id,subjectName:data1[j].name})
         }
     }
     obj.subjects = subArray;
     arr.push(obj)
    }
    console.log('all subjects and fields',arr)
    setAllSubjectsObj(arr);
 }

 const filterSubjects = (value)=>{
 let result =  allSubjectsObj.filter((el)=>{
    return el.field === value
  })
  if(result.length > 0 && result[0]?.subjects.length>0){
    let res = result[0]?.subjects
    console.log(res)
    setDropDownSubjects(res);
  }
 }
// Add student marks funtionality
 const handleMarksInsertion = async()=>{
  if(subjectValue === ""){
    setShowToast(true);
    setToastMsg("Please select Subject");
    return
  }
  let obj={
    marks:[{subject:subjectValue,marks:marks}]
  }
  console.log(obj)
  try {
    const res = await axios.patch(`https://gleaming-goat-shoulder-pads.cyclic.app/students/${studentID}/marks`,obj);
 if(res.status===200){
    console.log(res.data); 
    setShowModal(false);
    setShowToast(true);
    setToastBg('Success');
   setToastMsg("Marks added successfully");
   setMarks("");
   setStudentID("");
   setSubjectValue("");
   fetchData();
 }
} catch (error) {
    console.log(error);
}
 }
 // deleting student marks funtionality
 const handleMarksDelete = async(ID,sub,num)=>{
  let obj={
    value:{subject:sub,marks:num}
  }
  console.log(obj)
  try {
    const res = await axios.patch(`https://gleaming-goat-shoulder-pads.cyclic.app/students/${ID}/delete`,obj);
 if(res.status===200){
    console.log(res.data); 
    setShowToast(true);
    setToastBg('Success');
   setToastMsg("Student marks Deleted successfully");
   fetchData();
 }
} catch (error) {
    console.log(error);
}
 }

 // updating student marks funtionality
 const handleNewMarksUpdate = async()=>{
  let obj={
    prevMarks:{subject:subjectValue2,marks:prevMarks},
     newMarks:{marks:NewMarks}
  }
  console.log(obj)
  try {
    const res = await axios.patch(`https://gleaming-goat-shoulder-pads.cyclic.app/students/${studentID}/updateMarks`,obj);
 if(res.status===200){
    console.log(res.data); 
   setShowModal2(false);
   setShowToast(true);
   setToastBg('Success');
   setToastMsg("Student marks Updated successfully");
  setPrevMarks("");
  setStudentID("");
  setSubjectValue2("");
  fetchData();
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
          <td  >
            {el?.marks?.map((val,i) => (
              <h5><Badge bg="secondary" key={i}>{val?.subject}-{val?.marks}
              <i class="bi bi-pencil-fill" id="AdminEditIcon"  
                    onClick={() => {
                      setShowModal2(true);
                      setStudentID(el?._id);
                      setSubjectValue2(val?.subject);
                      setPrevMarks(val?.marks);
                      setNewMarks(val?.marks);
                        }}
                    ></i>
                <i class="bi bi-x-circle-fill" id="AdminDeleteIcon" 
                 onClick={() => 
                  handleMarksDelete(el?._id,val?.subject,val?.marks)
                } ></i>
              </Badge></h5>
            ))}
            </td>
          <td> <Button variant="primary" onClick={()=>{
             filterSubjects(el?.field);
            setShowModal(true);
            setStudentID(el?._id);
            }}>Add Subject and Marks</Button></td>
         </tr>
          ))}
      </tbody>
    </Table>
    {/*------------------     Modal start   -------------------------*/}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject and Marks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label style={{fontWeight:"bold"}} >
              Select Subject</label><br />
              <select onChange={(e)=>setSubjectValue(e.target.value)} value={subjectValue} >
              <option value="" >Select Subject</option>
                {dropDownSubjects && dropDownSubjects.map((el,i)=>(
                  <option value={el?.subjectName} key={i}>{el?.subjectName}</option>
                ))}
              </select><br />
            <label style={{fontWeight:"bold"}} >
              Enter Marks</label>
            <input type="number" value={marks} 
            placeholder="Enter Number only"
            onChange={(e)=>setMarks(e.target.value)} 
            style={{width:"100%",padding:"6px"}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMarksInsertion}
          disabled = {marks.length == 0 ? true : false}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
{/*-------------------    Modal End   ---------------------------*/}

{/*------------------     Modal2 start   -------------------------*/}
<Modal show={showModal2} onHide={() => setShowModal2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Marks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label style={{fontWeight:"bold"}} >
               Subject Name</label><br />
             <p>{subjectValue2}</p>
            <label style={{fontWeight:"bold"}} >
              Enter New Marks</label>
            <input type="number" value={NewMarks} 
            placeholder="Enter Number only"
            onChange={(e)=>setNewMarks(e.target.value)} 
            style={{width:"100%",padding:"6px"}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal2(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNewMarksUpdate}
          disabled = {NewMarks.length == 0 ? true : false}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
{/*-------------------    Modal2 End   ---------------------------*/}

{/*---------------------   Toast start --------------------------*/}
<ToastContainer
          className="p-3"
          position='bottom-center'
          style={{ zIndex: 1 }}
        >
       <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000}  bg={toastBg} autohide>
          <Toast.Header>
            <strong className="me-auto">Message</strong>
          </Toast.Header>
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
        </ToastContainer>
{/*-----------------------   Toast End   -----------------------------*/}
    </div>
  )
}

export default AdminAllStudents