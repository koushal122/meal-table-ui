import React from 'react'
import { CAROUSEL_SLIDERS , products} from '../../Constants/constants';
import Header from '../../Components/navbar';
import ImageSlider from '../../Components/imageSlider';
import About from '../../Components/about/story';
import Reviews from '../../Components/reviews';
import GrowingNumbers from '../../Components/about/growing';
import Footer from '../../Components/footer';
import AppLayout from '../../layout/appLayout';

const AboutPage = () => {
  return (
    <AppLayout>
        <ImageSlider Images={CAROUSEL_SLIDERS}/>
        <About/>
        <Reviews/>
        <GrowingNumbers/>
    </AppLayout>
  )
}

export default AboutPage