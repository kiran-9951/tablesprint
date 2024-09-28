import React, { useState } from 'react';
import './Login.css'; // Optional: for custom styles
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 

   
    if (!email || !password) {
      return setMessage("Both fields are required");
    }

    const userData = { email, password };

    try {
      const response = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard")
        setMessage('Logged in successfully!');
        
      
       
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          {message && <div className="alert">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
