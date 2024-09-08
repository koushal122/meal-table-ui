import React from 'react'
import Header from '../../Components/navbar'
import Footer from '../../Components/footer'
import { CAROUSEL_SLIDERS } from '../../Constants/constants'
import './index.scss'

const AppLayout = (props) => {
  const {children,showHeader=true,showFooter=true} = props
  return (
     <div className='user-layout'>
        {showHeader && <Header/>}
        {children}
        {showFooter && <Footer/>}
     </div>
  )
}

export default AppLayout