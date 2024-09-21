import React, { useState } from 'react';

function TextInput() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ padding: '20px',}}>
      <label>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          style={{ padding: '5px', width: '350px', borderRadius: '10px', border: '1px solid #ccc' }}
        />
      </label>
      <p style={{ marginTop: '10px', fontSize: '16px' }}>{value}</p>
    </div>
  );
}

export default TextInput;
