import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>Token: {user?.token}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;