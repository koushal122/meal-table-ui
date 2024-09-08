import React, { useEffect, useState } from 'react'
import Header from '../../Components/navbar';
import AdressAndLocation from '../../Components/adressAndLocation';
import BookTable from '../../Components/bookTable';
import ImageSlider from '../../Components/imageSlider';
import { CAROUSEL_SLIDERS , products} from '../../Constants/constants';
import './home.scss';
import About from '../../Components/about/story';
import Services from '../../Components/services';
import Coffe_cup_image from '../../Images/coffee_cup.png';
import Coffee_cup_image2 from '../../Images/coffee_cup_2.png';
import DrinkImage from '../../Images/drink-with-ice.png';
import Coffee_cup_image3 from '../../Images/carousel_bg_2.png';
import GrowingNumbers from '../../Components/about/growing';
import ProductItem from '../../Components/productItem';
import ProductMenu from '../../Components/productMenu';
import Reviews from '../../Components/reviews';
import Blog from '../../Components/blog';
import Footer from '../../Components/footer';
import { Link } from 'react-router-dom';
import AppLayout from '../../layout/appLayout';




const Home = () => {
   useEffect(()=> {
   },[]);
    return (
        <AppLayout>
        <ImageSlider Images={CAROUSEL_SLIDERS}/>
        <div className="home-adress-book-table">
          <AdressAndLocation className="address-location" ></AdressAndLocation>
          <BookTable className="home-book-table" ></BookTable>
        </div>
        <About/>
        <Services/>
        <div className="home-menu-section">
            <div className="home-menu-section-first">
                 <span>Discover</span>
                 <h3>OUR MENU</h3>
                 <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                 <Link to='/menu'><button>View Full Menu</button></Link>
            </div>
            <div className="home-menu-section-images-row">
               <div className="home-menu-section-images-col">
                  <img src={Coffe_cup_image} alt='coffee_cup' />
                  <img src={DrinkImage} alt='coffee_cup' />
               </div>
               <div className="home-menu-section-images-col" >
                 <img src={Coffee_cup_image2} alt='coffee_cup' />
                  <img src={Coffee_cup_image3} alt='coffee_cup' />
               </div>
            </div>
        </div>
         <GrowingNumbers/>
         <ProductMenu itemLimit={6}/>
         <Reviews/>
         <Blog/>
         <hr></hr>
         </AppLayout>
        
      );
}

export default Home