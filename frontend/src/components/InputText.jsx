import React, { useState } from 'react';

function TextInput() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You entered: ${value}`);
    document.getElementById('input').value = '';
  }
  const changeStyle = (event) => {
    event.target.style.backgroundColor = 'lightblue';
  }

  return (
    <div style={{ padding: '20px',}}>
      <label>
        <input
          type="text"
          value={value}
          id = "input"
          onChange={handleChange}
          style={{ padding: '5px', width: '350px', borderRadius: '10px', border: '1px solid #ccc' }}
        />
        <input
          type="submit"
          value="Submit"
          onMouseEnter={changeStyle}
          onMouseLeave={(event) => event.target.style.backgroundColor = 'white'}
          onClick={handleSubmit}
          style={{ padding: '5px', borderRadius: '10px', border: '1px solid #ccc', marginLeft: '10px' }}
        />
      </label>
      <p style={{ marginTop: '10px', fontSize: '16px' }}>{value}</p>
    </div>
  );
}

export default TextInput;
