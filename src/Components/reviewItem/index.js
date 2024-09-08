import React from 'react'
import './index.scss'

const ReviewItem = ({data,className}) => {
  return (
    <div className={`reviewer-item-container ${className}`}>
        <p>{data.review}</p>
        <div className='reviewer-details'>
          <div className="reviewer-name-positon">
            <h4 className="reviewer-name">{data.name}</h4>
            <p className="reviewer-position">{data.position}</p>
          </div>
        </div>
    </div>
  )
}

export default ReviewItem