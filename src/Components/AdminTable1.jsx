import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const AdminTable1 = () => {
   const [data,setData] = useState([]);
// Modal variables start
   const [showFieldModal, setShowFieldModal] = useState(false);
   const [streamValue ,setStreamValue] = useState("");
   const [modalType, setModalType] = useState("Add");
   const [editFieldID ,setEditFieldID] = useState(null);
// Modal variables end

//  toast variables start
   const [showToast, setShowToast] = useState(false);
   const [toastBg, setToastBg] = useState('Primary');
   const [toastMsg, setToastMsg] = useState();
//  toast variables end

// function to add stream/field
   const handleStreamAdd = async()=>{
    let obj={ name :streamValue}
    try {
        const res2 = await axios.post("https://gleaming-goat-shoulder-pads.cyclic.app/fields/add",obj);
        console.log(res2)
     if(res2.status==201){
        console.log(res2.data); 
        setShowToast(true);
        setToastBg('Success');
        setToastMsg('Stream Added Successfull');
        fetchData();
        setStreamValue("");
        setShowFieldModal(false);
     }
    } catch (error) {
        console.log(error);
        setShowToast(true);
        setToastBg('Error');
        setToastMsg('Not able to add stream');
    } 
}

   useEffect(()=>{
    fetchData();
   },[])
// fetching data on mounting
   const fetchData = async()=>{
    try {
        const res1 = await axios.get("https://gleaming-goat-shoulder-pads.cyclic.app/subjects/allSubjects");
     if(res1.status==200){
        console.log(res1.data);
        try {
            const res2 = await axios.get("https://gleaming-goat-shoulder-pads.cyclic.app/fields/allStreams");
         if(res2.status==200){
            console.log(res2.data); 
            filterAndMapData(res1.data, res2.data);
         }
        } catch (error) {
            console.log(error);
        }
    
     }
    } catch (error) {
        console.log(error);
    }

   }
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
   console.log(arr)
   setData(arr);
}

// delete field data function
const handleFieldDelete = async(ID)=>{
    try {
        const res = await axios.delete(`https://gleaming-goat-shoulder-pads.cyclic.app/fields/${ID}`);
      if(res.status==200){
        setShowToast(true);
        setToastBg('Success');
        setToastMsg(res?.data?.message);
        fetchData();
     }
    } catch (error) {
        console.log(error);
        setShowToast(true);
        setToastBg('Error');
        setToastMsg("Error encountered while deleting field");
    }
}

//function to check type of modal required
const handleModalSubmit = async()=>{
    if(modalType==="Add"){
        handleStreamAdd();
    }
    else if(modalType==="Edit"){
        handleFieldUpdate();
    }
}

// update field data function
const handleFieldUpdate = async()=>{
    let obj={ name :streamValue}
    try {
        const res = await axios.put(`https://gleaming-goat-shoulder-pads.cyclic.app/fields/${editFieldID}`,obj);
      if(res.status==200){
        setShowToast(true);
        setToastBg('Success');
        setToastMsg(res?.data?.message);
        fetchData();
        setStreamValue("");
        setShowFieldModal(false);
     }
    } catch (error) {
        console.log(error);
        setShowToast(true);
        setToastBg('Error');
        setToastMsg("Error encountered while updating field");
    }
}

    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Field/Streams</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((el,i)=>(
                <tr key={i} >
                    <td>{el?.field}
                    <i class="bi bi-pencil-fill" id="AdminEditIcon"  
                    onClick={() => {
                        setShowFieldModal(true); 
                        setModalType("Edit");
                         setEditFieldID(el?.field_id);
                         setStreamValue(el?.field);
                        }}
                    ></i>
                    <i class="bi bi-trash" id="AdminDeleteIcon"  onClick={()=>handleFieldDelete(el?.field_id)}></i>
                    </td>
                    {el?.subjects?.map((sub)=>(
                        <td key={sub.subjectId}>{sub?.subjectName}</td>
                    ))}
                </tr>
            ))}
            <tr>
                <td> <Button size="lg" onClick={() => {setShowFieldModal(true); setModalType("Add");}} >Add Field/Stream</Button></td>
            </tr>
          </tbody>
{/*------------------     Modal start   -------------------------*/}
          <Modal show={showFieldModal} onHide={() => setShowFieldModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Field/Stream</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label style={{fontWeight:"bold"}} >Enter Stream Name</label>
            <input type="text" value={streamValue} onChange={(e)=>setStreamValue(e.target.value)} style={{width:"100%",padding:"6px"}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFieldModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleModalSubmit()}
          disabled = {streamValue.length == 0 ? true : false}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
{/*-------------------    Modal End   ---------------------------*/}

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
        </Table>
      );
}

export default AdminTable1