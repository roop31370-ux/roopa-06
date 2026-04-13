import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // This sends the email to your Node.js backend
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            
            if (response.data.Status === "Success") {
                setMessage(response.data.message);
                // Redirect user to reset-password page after success
                setTimeout(() => navigate(`/reset-password/${email}`), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.error || "User not found or Server error");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Forgot Password</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Verify Email</button>
                </form>
            </div>
        </div>
    );
};

// This line is MANDATORY to fix the "export named default" error
export default ForgotPassword;