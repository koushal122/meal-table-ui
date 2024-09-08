import React from 'react';
import './index.scss';

const CustomModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                {children}
                <div className="modal-buttons">
                    <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
