import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

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
    <div style={{ display: 'grid', placeItems: 'center'}}>
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
                style={{ marginLeft: '10px', marginBottom: '30px'}}
            >
                Submit
            </Button>  
        </form>

      {description && (
        <div style={{ display: 'grid', placeItems: 'center'}}>
          <img src={imageUrl} alt={description} style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '5%' }} />
          <h2>Description:</h2>
          <p>{description}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>    
  );
};

export default ImageDescription;
