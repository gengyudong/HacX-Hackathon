import React, { useState } from 'react';
import TextInput from './InputText'; // Adjust this path based on your structure
import Navbar from './Navbar'; // Adjust this path based on your structure
import styles from './Scraper.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Scraper = () => {
  const [value, setValue] = useState(''); // State to hold the input value

  const handleInputChange = (event) => {
    setValue(event.target.value); // Update state with input value
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    alert(`You entered: ${value}`); // Show the input value
    setValue(''); // Clear the input field
  };

  const changeStyle = (event) => {
    event.target.style.backgroundColor = 'lightblue'; // Change background on hover
  };

  return (
    <div className={styles.scraper}>
      <Navbar />
      <div className={styles.crimewatch}>crimewatch</div>
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh', paddingTop: '200px' }}>
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <div className="text-center p-4" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3 className={styles.whichWebsiteWould}>Which website would you like to check?</h3>
              <form onSubmit={handleSubmit}>
                <TextInput value={value} onChange={handleInputChange} />
                <Button
                  type="submit"
                  onMouseEnter={changeStyle}
                  onMouseLeave={(event) => (event.target.style.backgroundColor = 'white')}
                  style={{ marginLeft: '10px', marginBottom: '10px' }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Scraper;


      			