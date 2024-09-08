import React from 'react'
import { CAROUSEL_SLIDERS , products} from '../../Constants/constants';
import Header from '../../Components/navbar';
import ImageSlider from '../../Components/imageSlider';
import Blog from '../../Components/blog';
import Footer from '../../Components/footer';
import AppLayout from '../../layout/appLayout';

const BlogPage = () => {
  return (
    <AppLayout>
        <ImageSlider Images={CAROUSEL_SLIDERS}/>
        <Blog/>
    </AppLayout>
  )
}

export default BlogPage