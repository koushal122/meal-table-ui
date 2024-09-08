import React from 'react'
import CoffeeCupIcon from '../../../Images/coffee-cup-icon.svg'
import './index.scss'

const GrowingNumbers = () => {
  return (
    <div className="about-growing-container">
        <div className='about-growing-branches'>
            <img src={CoffeeCupIcon} alt='coffee' className="about-growing-container-image"/>
            <span className="about-growing-type">Coffee Branches</span>
        </div>
        <div className='about-growing-awards'>
            <img src={CoffeeCupIcon} alt='coffee' className="about-growing-container-image"/>
            <span className="about-growing-type" >Number of Awards</span>
        </div>
        <div className='about-growing-customers'>
             <img src={CoffeeCupIcon} alt='coffee' className="about-growing-container-image"/>
             <span className="about-growing-type" >Happy Customers</span>
        </div>
        <div className='about-growing-staffs'>
              <img src={CoffeeCupIcon} alt='coffee' className="about-growing-container-image" />
              <span className="about-growing-type" >Number of Staffs</span>
        </div>
    </div>
  )
}

export default GrowingNumbers