import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import your components 
// 💡 IMPORTANT: Make sure the file names match exactly!
import Login from './components/Login'; 
import Register from './components/Register'; // Changed from Signup to Register
import Dashboard from './components/Dashboard'; 
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword'; 

// 🛡️ The Protected Route "Guard"
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If AuthContext is still checking for a token, show a loader
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // If no user is found in context/localStorage, boot them to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* 1. Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Note: In your backend, you verify by email, 
          but usually, reset pages use a :token parameter */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* 2. 🔒 Protected Route */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* 3. Redirect root to Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* 4. 404 Page Not Found */}
      <Route path="*" element={
        <div className="text-center mt-5">
          <h2 className="text-danger">404: Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
        </div>
      } />
    </Routes>
  );
}

export default App;