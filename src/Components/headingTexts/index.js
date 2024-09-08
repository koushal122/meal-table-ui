import React from 'react';
import './index.scss'

const HeadingText = ({heading1, heading2}) => {
  return (
    <div className="heading-texts">
        <span>{heading1}</span>
        <h2>{heading2}</h2>
        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
    </div>
  )
}

export default HeadingText