import React from 'react'
import Header from '../../Components/navbar'
import AdressAndLocation from '../../Components/adressAndLocation'
import BookTable from '../../Components/bookTable'
import ImageSlider from '../../Components/imageSlider'
import { CAROUSEL_SLIDERS , products} from '../../Constants/constants';
import ProductMenu from '../../Components/productMenu'
import Footer from '../../Components/footer'
import AppLayout from '../../layout/appLayout'
import './menu.scss'

const Menu = () => {
  return (
    <AppLayout>
        <div className="menu-container">
          <AdressAndLocation className="address-location" ></AdressAndLocation>
          <BookTable className="home-book-table" ></BookTable>
        </div>
        <ProductMenu/>
    </AppLayout>
  )
}

export default Menu