import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ImageDescription = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageUrl.trim()) {
      alert('Please enter an image URL.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/describe-image', {
        image_url: imageUrl,
      });
       // Clear the input field after successful submission
      console.log('Response:', response);
      setDescription(response.data.descriptionOfAnalysis); // Assuming the response has a "results" field
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while fetching the description.');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
    <Row className="w-100">
    <Col xs={12} md={6} lg={4} className="mx-auto">
        <div className="text-center p-4" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '50px' }}>
        <h1>Image Description Generator</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            style={{ width: '300px', marginRight: '10px' }}
            />
            <Button
                type="submit"
                style={{ marginLeft: '10px', marginBottom: '10px' }}
            >
                Submit
            </Button>  
        </form>

      {description && (
        <div>
          <h2>Description:</h2>
          <img src={imageUrl} alt="Image" style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
          <p>{description}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>    
    </Col>
    </Row>
    </Container>
  );
};

export default ImageDescription;
