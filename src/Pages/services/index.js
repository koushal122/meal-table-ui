import React from 'react'
import Header from '../../Components/navbar'
import ImageSlider from '../../Components/imageSlider'
import { CAROUSEL_SLIDERS , products} from '../../Constants/constants';
import Services from '../../Components/services';
import Footer from '../../Components/footer';
import AppLayout from '../../layout/appLayout';
const ServicesPage = () => {
  return (
    <AppLayout>
        <ImageSlider Images={CAROUSEL_SLIDERS}/>
        <Services/>
    </AppLayout>
  )
}

export default ServicesPage