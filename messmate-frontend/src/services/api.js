import axios from 'axios';

const api = axios.create({
 baseURL: 'https://messmate-project.onrender.com', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;