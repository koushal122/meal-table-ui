import React from 'react'
import './index.scss'
import restrictedImage from '../../Images/restricted.jpg'

export const Unauthorized = () => {
  return (
    <div className='unauthorized'>
       <img src={restrictedImage} alt='unauthorized' className='unauth-image'/>
       <p>Happy to see You !</p>
       <p>Please Login to check this page.</p>
    </div>
  )
}

export default Unauthorized;