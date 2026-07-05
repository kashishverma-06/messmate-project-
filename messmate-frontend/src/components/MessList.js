import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import MessCard from './MessCard';

function MessList({ refresh }) {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

      api.get(`/messes?location=${location}`)
      .then((res) => {
        setMesses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load mess data.');
        setLoading(false);
      });
  }, [location , refresh]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div>
         <select                            
            className="form-select"
              name="location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
>
  <option value="">All Locations</option>
  <option value="Indore">Indore</option>
  <option value="Bhopal">Bhopal</option>
  <option value="Khandwa">Khandwa</option>
</select>
      <h2>Mess Listings</h2>
      
       <div className="card-container">
          <p>Total Messes: {messes.length}</p>
          
           {messes.map((mess) => (
         <MessCard
         key={mess.id}
         mess={mess}
         />
        ))}
        </div>
      
    </div>
  );
}

export default MessList;