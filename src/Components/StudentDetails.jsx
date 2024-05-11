import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StudentGraphTable from './StudentGraphTable';

const StudentDetails = ({data}) => {
 //   console.log(data)

 useEffect(()=>{

 },[])

  return (
    <div className='studentDetailsMainDiv' >
        <div className='studentDetailsLeftDiv'>
          <h3 style={{fontWeight:"bold"}} >{data?.name ? data?.name.toUpperCase() : "USER"} Your Subjectwise Marks </h3>
            <StudentGraphTable  MarksData={data?.marks ? data?.marks : []} />
        </div>
        <div className='studentDetailsRightDiv' >
        <Card style={{ width: '400px' }} className='Homepage_row_cards'>
        <Card.Img className='studentDashboardImg' variant="top" src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
      <Card.Body>
        <Card.Title>STUDENT NAME :- {data?.name ? data?.name.toUpperCase() : "NA"}</Card.Title>
        <Card.Title>STUDENT Enrollment ID :- {data?.enrollmentID ? data?.enrollmentID : "NA"}</Card.Title>
        <Card.Title>STUDENT Stream/Field :- {data?.field ? data?.field.toUpperCase() : "NA"}</Card.Title>
        <Card.Title>STUDENT YEAR :- {data?.year ? data?.year : "NA"}</Card.Title>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
        </div>
    </div>
  )
}

export default StudentDetails