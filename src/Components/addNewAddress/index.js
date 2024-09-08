import React, { useState } from 'react';
import './index.scss'

const AddNewAddress = ({ addNewAddress, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    buildingName: '',
    townName: '',
    districtName: '',
    pincode: '',
    stateName: ''
  });

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewAddress(formData,onClose); 
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-content'>
        <button className="popup-close" onClick={onClose}>X</button>
        <div className="popup-message">
          <form onSubmit={handleSubmit} className='address-form'>
            <div>
              <label><strong>Name:</strong></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter you name'
                required
              />
            </div>
            <div>
              <label><strong>Phone Number:</strong></label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder='Enter you phone number'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label><strong>Building Name:</strong></label>
              <input
                type="text"
                name="buildingName"
                placeholder='Enter you building name'
                value={formData.buildingName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label><strong>Town/City Name:</strong></label>
              <input
                type="text"
                name="townName"
                value={formData.townName}
                onChange={handleChange}
                placeholder='Enter you town/City Name'
                required
              />
            </div>
            <div>
              <label><strong>District Name:</strong></label>
              <input
                type="text"
                name="districtName"
                value={formData.districtName}
                placeholder='Enter you District Name'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label><strong>Pincode:</strong></label>
              <input
                type="number"
                name="pincode"
                placeholder='Enter you pincode'
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label><strong>State Name:</strong></label>
              <input
                type="text"
                name="stateName"
                placeholder='Enter you State Name'
                value={formData.stateName}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className='button'>Add New Address</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;
