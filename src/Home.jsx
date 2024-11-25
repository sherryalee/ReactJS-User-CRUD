import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First try to get data from localStorage
        const localData = localStorage.getItem('users');
        
        if (localData) {
          setData(JSON.parse(localData));
          setLoading(false);
        } else {
          // If no local data, fetch from API
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          setData(response.data);
          // Store in localStorage
          localStorage.setItem('users', JSON.stringify(response.data));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch users. Please try again later.');
        // Try to get data from localStorage as fallback
        const localData = localStorage.getItem('users');
        if (localData) {
          setData(JSON.parse(localData));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        localStorage.setItem('users', JSON.stringify(updatedData));
      } catch (err) {
        console.error('Failed to delete user:', err);
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="text-center mb-4 text-primary">User Management System</h1>
          
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError(null)}></button>
            </div>
          )}
          
          <div className="card shadow-lg">
            <div className="card-header bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">List of Users</h5>
                <Link to="/create" className="btn btn-success">
                  <i className="fas fa-plus me-1"></i>Add New User
                </Link>
              </div>
            </div>
            
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4">Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th className="d-none d-md-table-cell">Phone</th>
                      <th className="d-none d-lg-table-cell">Username</th>
                      <th className="d-none d-xl-table-cell">Website</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          <div className="text-muted">
                            <i className="fas fa-inbox fa-2x mb-3 d-block"></i>
                            No users available
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4">{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td className="d-none d-md-table-cell">{item.phone}</td>
                          <td className="d-none d-lg-table-cell">{item.username}</td>
                          <td className="d-none d-xl-table-cell">{item.website}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <Link 
                                to={`/update/${item.id}`} 
                                className="btn btn-sm btn-primary"
                                title="Edit User"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="btn btn-sm btn-danger"
                                title="Delete User"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
 