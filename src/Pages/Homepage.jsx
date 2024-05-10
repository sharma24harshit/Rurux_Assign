import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const nav = useNavigate();

    return (
        <Container className='Homepagecards'>
        <Row className='Homepage_row_cards'>
       
         <Card style={{ width: '18rem' }} className="text-center homepage_card" onClick={()=>nav("/admin/login")}>
          <Card.Img className='homepage_img' variant="top" src="https://www.nicepng.com/png/detail/263-2636180_admin-login-png-admin-login-image-png.png" />
          <Card.Body>
            <Card.Title className="homepage_bold_text">ADMIN</Card.Title>
            <Card.Text >
              Login if you have the admin rights.
            </Card.Text>
            <Button variant="primary" onClick={()=>nav("/admin/login")} >Admin Login</Button>
          </Card.Body>
        </Card>
       

       
        <Card style={{ width: '18rem' }} className="text-center homepage_card" onClick={()=>nav("/student/login")}>
          <Card.Img className='homepage_img' variant="top" src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
          <Card.Body>
            <Card.Title className="homepage_bold_text">USER</Card.Title>
            <Card.Text>
              Login if you have only user rights.
            </Card.Text>
            <Button variant="primary" onClick={()=>nav("/student/login")}>User Login</Button>
          </Card.Body>
        </Card>
        
        </Row>
    </Container>
      );
}

export default Homepage