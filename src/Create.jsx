import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    website: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Create new user with an ID
      const newUser = {
        ...values,
        id: existingUsers.length > 0 ? Math.max(...existingUsers.map(user => user.id)) + 1 : 1
      };
      
      // Add to existing users
      const updatedUsers = [...existingUsers, newUser];
      
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Navigate back to home
      navigate('/');
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-white py-3">
              <h1 className="h4 mb-0">Create New User</h1>
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
                    value={values.name}
                    onChange={(e) => setValues({ ...values, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={values.phone}
                    onChange={(e) => setValues({ ...values, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={values.username}
                    onChange={(e) => setValues({ ...values, username: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="website" className="form-label">Website</label>
                  <input
                    type="url"
                    className="form-control"
                    id="website"
                    value={values.website}
                    onChange={(e) => setValues({ ...values, website: e.target.value })}
                    required
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <Link to="/" className="btn btn-light">
                    Cancel
                  </Link>
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : (
                      'Create User'
                    )}
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

export default Create;
