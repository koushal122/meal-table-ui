import React from 'react';
import './index.scss'; 

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>X</button>
        <div className="popup-message">{message}</div>
      </div>
    </div>
  );
};

export default Popup;