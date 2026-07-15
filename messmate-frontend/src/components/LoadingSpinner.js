import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="spinner-container" role="status">
      <div className="spinner"></div>
      <p className="spinner-text">{text}</p>
    </div>
  );
}

export default LoadingSpinner;