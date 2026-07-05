import React from 'react';

import './Mess.css';

function MessCard({ mess }) {
  return (
    <div className="mess-card">
      <h3>{mess.name}</h3>
      <p>📍 {mess.location}</p>
      <p className="price">₹{mess.price}/month</p>
    </div>
  );
}

export default MessCard;
