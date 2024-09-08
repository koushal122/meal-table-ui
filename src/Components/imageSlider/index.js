import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.scss';
import React from 'react'
import { Link } from 'react-router-dom';

const ImageSlider = ({Images}) => {

    const settings = {
        infinite: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
       
      };

  return (
       <Slider {...settings} >
       {Images.map((item) => (
            <div key={item.id} className="image-slider">
              <img src={item.src}  alt={item.alt} className="img" />
              <div id='above-image' className="slider-content">
                <span className="cursive-text-primary-color">Welcome</span>
                <h1 className="slider-title">{item.title}</h1>
                <p className="slider-moral">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                <div className="order-and-view-menu-button-container">
                    <Link to='/menu'><button className="order-button">Order Now</button></Link>
                    <Link to='/menu'><button className="view-menu-button">View Menu</button></Link>
                </div>
              </div>
            </div>
            
          ))}
           
       </Slider>
  )
}

export default ImageSlider;
