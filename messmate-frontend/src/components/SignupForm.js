import React, { useState } from 'react';
import axios from 'axios';
import "../App.css";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/auth/register', form);

      alert('Registration successful. Please log in.');

      // reset form
      setForm({ username: '', password: '' });

      // redirect to login
      navigate('/login');

    } catch (err) {
      if (err.response?.status === 409) {
        alert('User already exists.');
      } else {
        alert('Registration failed.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="auth-btn" type="submit">
          Register
        </button>

        <p
          className="auth-link"
          onClick={() => navigate('/login')}
          style={{ cursor: 'pointer' }}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default SignupForm;


/*
import React, { useState } from 'react';
import axios from 'axios';
 import "../App.css";
const SignupForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/auth/register', form);
      alert('Registration successful. Please log in.');

      setForm({
  username: '',
  password: ''
});

    } catch (err) {
      if (err.response?.status === 409) {
        alert('User already exists.');
      } else {
        alert('Registration failed.');
      }
    }
  };



return (
  <div className="auth-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>

      <div className="input-group">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>

      <button className="auth-btn" type="submit">
        Register
      </button>

      <p className="auth-link">
        Already have an account? Login
      </p>
    </form>
  </div>
);
};

export default SignupForm;*/