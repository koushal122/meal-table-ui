import React, { useState } from 'react'
import './index.scss'

const AddAdminForm = ({onSave,onClose}) => {
    const [formData, setFormData] = useState({
        adminName: '',
        newAdminEmail: '',
        password: '',
        canCreateAdmin: false,
      });

      const handleDropdownChange = (e) => {
        setFormData({
          ...formData,
          canCreateAdmin: e.target.value === 'yes' ? true : false,
        });
      };

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      
      const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData,onClose); 
      };
  return (
    <div>
        <form onSubmit={handleSubmit} className='address-form'>
            <div>
              <label><strong>Name:</strong></label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                placeholder='Enter new admin name'
                required
              />
            </div>
            <div>
              <label><strong>Email :</strong></label>
              <input
                type="email"
                name="newAdminEmail"
                placeholder='Enter new admin email address'
                value={formData.newAdminEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label><strong>Password:</strong></label>
              <input
                type="password"
                name="password"
                placeholder='Enter new admin password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='admin-permission-dropdown'>
          <label><strong>Can Create Admin:</strong></label>
          <select
            name="canCreateAdmin"
            value={formData.canCreateAdmin ? 'yes' : 'no'}
            onChange={handleDropdownChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
            <button type="submit" className='button'>Add New admin</button>
          </form>
    </div>
  )
}

export default AddAdminForm