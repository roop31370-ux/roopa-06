import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError(''); 

    try {
      // 2. Call the API
      const response = await authApi.register({ 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone, 
        password: formData.password 
      });

      // 3. Handle Success
      if (response.data.Status === "Success") {
        alert("Registration successful! Please login.");
        navigate('/login');
      }
    } catch (err) {
      // 4. Handle Errors from Backend
      console.error("Registration Error:", err);
      const errorMessage = err.response?.data?.error || "Registration failed. Try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>
        
        {error && <div className="alert alert-danger py-2 text-center small">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="form-control" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          
          <div className="mb-3">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="form-control" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div className="mb-3">
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="form-control" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              required 
            />
          </div>

          <div className="mb-3">
            <input 
              type="password" 
              placeholder="Password" 
              className="form-control" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          
          <div className="mb-4">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="form-control" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-primary w-100 fw-bold py-2"
            style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed' }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        
        <p className="mt-4 text-center small text-muted">
          Already have an account? <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#7c3aed' }}>Login</Link>
        </p> 
      </div>
    </div>
  );
};

export default Register;