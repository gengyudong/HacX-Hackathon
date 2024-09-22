import React, { useState } from 'react';
import TextInput from './InputText'; // Adjust this path based on your structure
import Navbar from './Navbar'; // Adjust this path based on your structure
import styles from './Scraper.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Scraper = () => {
  const [value, setValue] = useState(''); // State to hold the input value
  const [postDetails, setPostDetails] = useState(null); // State to hold the response data

  const handleInputChange = (event) => {
    setValue(event.target.value); // Update state with input value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    if (!value.trim()) {
      alert('Please enter a value.'); // Basic validation
      return;
    }
  
    try {
      // Update the URL to your backend endpoint
      const response = await fetch('http://localhost:3001/scrape', { // Change to your backend API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_url : value }), // Send the input value
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Handle errors
      }
      // Optional: Get the response data if needed
      const data = await response.json();
      console.log('Post details:', data);
      setPostDetails(data); // Update the state with the response data
      
      // Clear the input field after successful submission
      setValue(''); 
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting your data.'); // Error message
    }
  };  

  return (
    <div className={styles.scraper}>
      <Navbar />
      <div className={styles.crimewatch}>crimewatch</div>
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh', paddingTop: '50px' }}>
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <div className="text-center p-4" style={{ border: '1px solid #ccc', borderRadius: '8px', overflowY: 'auto' }}>
              <h3 className={styles.whichWebsiteWould}>Which website would you like to check?</h3>
              <form onSubmit={handleSubmit}>
                <TextInput value={value} onChange={handleInputChange} />
                <Button
                  type="submit"
                  style={{ marginLeft: '10px', marginBottom: '10px' }}
                >
                  Submit
                </Button>
              </form>
                {postDetails && (
                    <div className="mt-4">
                    <h4>Post Details</h4>
                    <p>Title: {postDetails.postDetails.post_title}</p>
                    <p>Author: {postDetails.postDetails.user_name}</p>
                    <a href={postDetails.postDetails.user_profile_link} target="_blank" rel="noopener noreferrer"> View Profile</a>
                    <div style={{ maxHeight: '300px'}}>
                    <h4>Content:</h4> 
                    <ul> 
                        {postDetails.postDetails.paragraph_texts.map((para, index) => ( 
                        <li key={index}>{para}</li> 
                        ))} 
                    </ul> 
                    <h4>Disinformation Result:</h4>
                    <p>{postDetails.jsonDisinformation.disinformationResult}</p>
                    <h4>Possibly Related Posts:</h4>
                    <ul style={{ paddingBottom: '20px'}}>
                      {postDetails.similarResults.map((post, index) => (
                        <li key={index}>
                          {post.link ? (
                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                              {post.title}
                            </a>
                          ) : (
                            post.title
                          )}
                        </li>
                      ))}
                    </ul>
                    </div>
                    </div>
                )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Scraper;


      			