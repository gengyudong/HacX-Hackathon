import React from 'react';

const TextInput = ({ value, onChange }) => {
  return (
    <div style={{ padding: '20px' }}>
      <label>
        <input
          type="text"
          value={value}
          id="input"
          onChange={onChange}
          style={{ padding: '5px', width: '350px', borderRadius: '10px', border: '1px solid #ccc', textAlign: "center"}}
        />
      </label>
      <p style={{ marginTop: '10px', fontSize: '16px' }}>{value}</p>
    </div>
  );
};

export default TextInput;

