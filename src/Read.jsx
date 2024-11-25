import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState({}); // Initialize as an object
  const { id } = useParams();

  // Fetch user data based on ID
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`) // Replace with your API
      .then((res) => setData(res.data))
      .catch((err) => console.error('Failed to fetch data:', err));
  }, [id]); // Include id in the dependency array

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3>Detail of User</h3>
        <div className="mb-2">
          <strong>Name: </strong>{data.name || 'N/A'}
        </div>
        <div className="mb-2">
          <strong>Email: </strong>{data.email || 'N/A'}
        </div>
        <div className="mb-2">
          <strong>Phone: </strong>{data.phone || 'N/A'}
        </div>
        <Link to={`/update/${id}`} className="btn btn-success">Edit</Link>
        <Link to="/" className="btn btn-primary ms-3">Back</Link>
      </div>
    </div>
  );
};

export default Read;
