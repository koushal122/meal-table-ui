import React from 'react'
import AboutImage from '../../../Images/about_bg_img.png'
import './index.scss'


const About = ({className}) => {
  return (
    <div className="about-section">
        <img src={AboutImage} alt='about' className="about-image"/>
        <div className="about-story">
            <span>Welcome</span>
            <h2>OUR STORY</h2>
            <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
        </div>
    </div>
  )
}

export default About