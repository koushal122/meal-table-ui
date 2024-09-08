import React from 'react'
import './index.scss'
import * as constants from './constants.js'
import { BASE_URL } from '../../config';


const CartItem = (props) => {
  const {
    id,
    name,
    description,
    imagePath,
    price,
    quantity,
    updateQuantity,
    removeProduct
   } = props;

  const getImageFullUrl=(url) =>{
    return BASE_URL+'/'+url;
  }


  return (
    <div className='cart-item'>
        <img alt='Item' src={getImageFullUrl(imagePath)} className='cart-image'/>
        <div className='name-description'>
            <p className='name'>{name}</p>
            <p className='description'>{description}</p>
        </div>
        <div className='quantity'>
           <i class="fa-solid fa-square-plus fa-2xl icon" style={{color: "#e59d38"}} onClick={()=>updateQuantity(id,quantity[id]+1)}></i>
           <p>{quantity[id]}</p>
           <i class="fa-solid fa-square-minus fa-2xl icon" style={{color: "#e59d38"}} onClick={()=>updateQuantity(id,quantity[id]-1)}></i>
        </div>
        <div className='price'>
            <p>&#8377;{price*quantity[id]}</p>
            <button type='button' className='remove-button' onClick={()=>removeProduct(id)}>remove</button>
        </div>
    </div>
  )
}

export default CartItem

