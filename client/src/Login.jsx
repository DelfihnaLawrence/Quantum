import React, { useState } from 'react';

const Login = () => {
  // State for dynamic colors
  const [backgroundColor, setBackgroundColor] = useState('#3498db');
  const [buttonColor, setButtonColor] = useState('#2ecc71');

  // Function to change colors dynamically
  const changeColors = () => {
    const newBackgroundColor = getRandomColor();
    const newButtonColor = getRandomColor();

    setBackgroundColor(newBackgroundColor);
    setButtonColor(newButtonColor);
  };

  // Helper function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ backgroundColor, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        <h2>Login</h2>
        {/* Your login form elements go here */}

        {/* Example button that changes colors */}
        <button
          style={{ backgroundColor: buttonColor, color: '#fff', padding: '10px', cursor: 'pointer', marginTop: '10px' }}
          onClick={changeColors}
        >
          Change Colors
        </button>
      </form>
    </div>
  );
};

export default Login;
