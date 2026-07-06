import axios from 'axios';

const api = axios.create({
 baseURL: 'http://localhost:5000', // or 3000 if using Mongo backend
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;