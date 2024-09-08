import React from 'react'
import './index.scss'

const Loader = ({ size = 'small', color = '#fff' }) => {
    const loaderSize = size === 'small' ? 'loader-small' : 'loader-large';

    return (
      <div className={`loader ${loaderSize}`} style={{ borderColor: `${color} transparent transparent transparent` }}></div>
    );
}

export default Loader