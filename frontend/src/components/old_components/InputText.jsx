import React from 'react';

const TextInput = ({ value, onChange }) => {
  return (
    <div>
      <label>
        <input
          type="text"
          value={value}
          id="input"
          onChange={onChange}
          style={{ padding: '5px', width: '350px', borderRadius: '10px', border: '1px solid #ccc', textAlign: "center"}}
        />
      </label>
      <div style={{ marginTop: '10px', marginBottom: '10px', fontSize: '16px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
      </div>
      </div>
  );
};

export default TextInput;

