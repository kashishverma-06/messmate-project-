import React, { useState } from 'react';
import api from '../services/api';
import './Mess.css';


function AddMessForm({ onMessAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await api.post('/messes', {
        name: formData.name,
        location: formData.location,
        price: parseInt(formData.price)
      });
      setMessage('Mess added successfully!');

      setTimeout(() => {
  setMessage('');
}, 3000);


      setFormData({ name: '', location: '', price: '' });
      if (onMessAdded) onMessAdded(response.data);
    } catch (err) {
      setError('Failed to add mess. Please check your inputs.');
      setTimeout(() => {
  setError('');
}, 3000);
    }
  };

  return (
    <div className="form-card">
      <h2>Add New Mess</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mess Name:</label>
          <input   className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input    className="form-input" type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Monthly Price (₹):</label>
          <input   className="form-input" type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <button   className="submit-btn" type="submit">Submit</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AddMessForm;