import React from 'react'
import './index.scss'
import FooterBlog from './footer-blog/footer-blog'
const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-about-us'>
            <h4>ABOUT US</h4>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>

        </div>
        <FooterBlog/>
        <div className='footer-services'>
            <h4>SERVICES</h4>
            <p>Cooked</p>
            <p>Delivered</p>
            <p>Quality Food</p>
            <p>Mixed</p>
        </div>
        <div className='footer-questions'>
            <h4>HAVE A QUESTION</h4>
            <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
            <p>	+2 392 3929 210</p>
            <p>	info@yourdomain.com</p>
        </div>
    </div>
  )
}

export default Footer