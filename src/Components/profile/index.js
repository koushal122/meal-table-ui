import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { Logout } from '../../Util/Authentication';
import useAuth from '../../customHooks/useAuth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const {logout} = useAuth();
  const userName = useSelector((store) => store.authentication.userName)
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logoutUser = () =>{
    logout();
  }

  return (
    <div className="profile-container">
     <div className='profile' onClick={() => setShowDropdown(!showDropdown)}>
          <i class="fa-regular fa-circle-user fa-2xl profile-icon"></i>
          <p>Hi {userName}</p>
     </div>
     {showDropdown && (
        <div className="profile-dropdown" ref={dropdownRef}>
          <ul>
            <li><Link to='/orders'>My Orders</Link></li>
            <li><Link to='/bookings'>My Bookings</Link></li>
            <li><Link onClick={()=>logoutUser()}>Logout</Link></li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Profile