import React, {useState} from 'react'
import './index.scss';
import { Link } from 'react-router-dom';
import MenuIcon from '../../Images/menu-icon-white.png';
import Profile from '../profile';

import useAuth from '../../customHooks/useAuth';
import useWindowDimensions from '../../customHooks/windowDimension';

const Header = () => {

  const [navChange,setNavchange]=useState(false);
  const [displayMenu,setDisplayMenu] = useState(false);
  const {isAuthenticated} =useAuth();
  const {height,width} = useWindowDimensions();

  const changeNavStyle=()=>{
      if(window.scrollY>=300){
          setNavchange(true)
      }else{
          setNavchange(false);
      }
  }
  window.addEventListener("scroll", changeNavStyle);
  window.addEventListener("resize", ()=>{
    if (window.innerWidth >= 1100){
        setDisplayMenu(true);
      } else {
        setDisplayMenu(false);
    }
  });

  return (
     <div className={navChange?"navbar navbar-style":"navbar"}>
      <div className='navbar-logo-with-menu'>
        <div id="logo">
              <div>Meal</div>
              <small>Table</small>
        </div>
      </div>
      <div className='navbar-menu-icon' onClick={()=>{setDisplayMenu(!displayMenu)}}>
            <img src={MenuIcon} alt='MenuIcon' className='navbar-menu-icon-image' />
      </div>
      <div>
        {
          width>=1100||displayMenu?
          <ul className="navbar-list">
            <Link to='/' className='navbar-list-item' onClick={()=>{setDisplayMenu(!displayMenu)}}><li>HOME</li></Link>
            <Link to='/menu' className='navbar-list-item' onClick={()=>{setDisplayMenu(!displayMenu)}}><li >MENU</li></Link>
            <Link to='/services' className='navbar-list-item' onClick={()=>{setDisplayMenu(!displayMenu)}}><li>SERVICES</li></Link>
            <Link to='/blog' className='navbar-list-item' onClick={()=>{setDisplayMenu(!displayMenu)}} ><li>BLOG</li></Link>
            <Link to='/about' className='navbar-list-item' onClick={()=>{setDisplayMenu(!displayMenu)}} ><li>ABOUT</li></Link>
            <Link to='/contact' className='navbar-list-item' onClick={()=>{setDisplayMenu(!displayMenu)}} ><li >CONTACT</li></Link>
            <Link to='/cart' className='navbar-list-item' onClick={()=>{setDisplayMenu(!displayMenu)}}><i class="fa-solid fa-cart-shopping badge fa-xl" value={isAuthenticated?8:0}></i></Link>
          </ul>
          :null
        }
      </div>
      {
          isAuthenticated ?
          (
             <Profile/>
          ):
          (
              <div className='login-signup-button'>
                <Link to='/login'><button type='button' className='login'>Login</button></Link>
                <Link to='/signup'><button type='button' className='signup'>Signup</button></Link>
              </div>
          )
      }
     </div>
  )
}

export default Header