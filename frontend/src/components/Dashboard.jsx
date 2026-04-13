import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Welcome, {user?.name || "User"}</h3>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      {/* Add Item Card */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="mb-3">Add New Item</h5>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Title"
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
        />

        <button className="btn btn-primary w-100">Add Item</button>
      </div>

      {/* Items List */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Your Items</h5>

        <p className="text-muted">No items yet...</p>
      </div>

    </div>
  );
};

export default Dashboard;