import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'http://localhost:4000/api/auth'
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => Promise.reject(error)

);


//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response ,
  (error) => {
    if(error.response && error.response.status === 401){
      alert("Your session has expired . Please log in again .");
      localStorage.removeItem("token"); //optional but recommended
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;