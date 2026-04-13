import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // ✅ FIXED
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });

      if (response.data.Status === "Success") {
        login(response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        setError(
          response.data.Message ||
          response.data.error ||
          "Invalid email or password"
        );
      }

    } catch (err) {
      setError(
        err.response?.data?.Message ||
        err.response?.data?.error ||
        'Server connection failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold">Login</h2>

        {error && (
          <div className="alert alert-danger py-2 text-center small">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input
              type="email"
              required
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Password</label>
            <input
              type="password"
              required
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 fw-bold rounded-0"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center small">
          <p className="mb-1 text-muted">
            Don't have an account?
            <Link to="/register" className="text-primary fw-bold text-decoration-none">
              Register here
            </Link>
          </p>

          <p className="mb-0">
            <Link to="/forgot-password" className="text-muted text-decoration-none">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;