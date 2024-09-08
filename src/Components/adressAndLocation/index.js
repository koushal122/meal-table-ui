import React from 'react'
import './index.scss';
import locationIcon from '../../Images/location-icon.png';
import callIcon from '../../Images/call-icon.png';
import clockIcon from '../../Images/clock-icon.png';

const AdressAndLocation = ({className}) => {
  return (
    <div className={`info ${className}`}>
        <div className="info-location">
          <img src={callIcon} alt='call icon' className="info-icons" />
          <div className='info-details'>
            <h3 className='info-details-header'>000 (123) 456 7890</h3>
          </div>
        </div>
        <div className="info-addres">
        <img src={locationIcon} alt='call icon' className="info-icons" />
          <div className='info-details'>
            <h3 className='info-details-header' >198 West 21th Street</h3>
            <p className='info-details-details' >203 Fake St. Mountain View, San Francisco, California, USA.</p>
          </div>
             
        </div>
        <div className="info-timing">
          <img src={clockIcon} alt='call icon' className="info-icons" />
          <div className='info-details'>
            <h3 className='info-details-header' >Open Monday-Sunday</h3>
            <p className='info-details-details' >8:00am - 9:00pm</p>
          </div>
        </div>
    </div>
  )
}

export default AdressAndLocation