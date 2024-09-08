import React from 'react'
import Header from '../../Components/navbar'
import { CAROUSEL_SLIDERS } from '../../Constants/constants'
import ImageSlider from '../../Components/imageSlider'
import ContactUS from '../../Components/contactUs'
import Footer from '../../Components/footer'
import AppLayout from '../../layout/appLayout'

const Contact = () => {
  return (
    <AppLayout>
        <ContactUS/>
    </AppLayout>
  )
}

export default Contact