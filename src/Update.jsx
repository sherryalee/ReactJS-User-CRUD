import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // First try to get user from localStorage
        const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = localUsers.find(user => user.id === parseInt(id));

        if (user) {
          setValues(user);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get current users from localStorage
      const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Update the user in the array
      const updatedUsers = localUsers.map(user => 
        user.id === parseInt(id) ? { ...values, id: parseInt(id) } : user
      );
      
      // Save back to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      navigate('/');
    } catch (err) {
      setError('Failed to update user');
      console.error('Error updating user:', err);
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
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white py-3">
              <h1 className="h4 mb-0">Update User</h1>
            </div>
            
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="website" className="form-label">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    id="website"
                    name="website"
                    value={values.website}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to="/" className="btn btn-light me-md-2">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary px-4">
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
