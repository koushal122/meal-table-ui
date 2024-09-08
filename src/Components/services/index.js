import React from 'react';
import EasyOrderImage from '../../Images/easy-order-icon.svg';
import FasterDeliveryImage from '../../Images/delivery-icon.svg';
import CoffeeBeansImage from '../../Images/coffee-beans-icon.svg';
import './index.scss';


const Services = () => {
  return (
    <div className="services-container">
        <div className="order-service">
            <img src={EasyOrderImage} alt='' />
           <h3>EASY TO ORDER</h3>
           <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
        </div>
        <div className="delivery-service">
           <img src={FasterDeliveryImage} alt='' />
           <h3>FASTEST DELIVERY</h3>
           <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
        </div>
        <div className="coffee-beans-service">
           <img src={CoffeeBeansImage} alt='' />
           <h3>QUALITY COFFEE</h3>
           <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
        </div>
        
    </div>
  )
}

export default Services