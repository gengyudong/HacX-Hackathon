import styles from './Photo.module.css';
import Navbar from './Navbar';
import ImageDescription from './OpenAI';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Photo = () => {
	return (
		<div className={styles.photo}>
		  <Navbar />
		  <div className={styles.crimewatch}>crimewatch</div>
		  <div className={styles.test}>
		  <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
		  <Row className="w-100">
		  <Col xs={12} md={6} lg={4} className="mx-auto">
		  <div className="text-center p-4" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '50px' }}>	
		  <ImageDescription />
		  </div>    
		  </Col>
		  </Row>
		  </Container>
		</div>
		</div>
	);
  };

export default Photo;