import axios from 'axios';

const api = axios.create({
 baseURL: 'https://messmate-project.onrender.com/api', // or 3000 if using Mongo backend
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;