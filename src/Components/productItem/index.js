import React from 'react'
import './index.scss'
import { BASE_URL } from '../../config'
import useAuth from '../../customHooks/useAuth';
import * as constants from './constans.js'
import genericInterface from '../../Util/genericInterface';

const ProductItem = (props) => {
  const {key,Item, className, showAddCartButton=true,showDeleteButton=false,deleteProduct} =props;
  const {isAuthenticated} = useAuth();
  const addToCartApi = genericInterface(constants.ADD_TO_CART_ENDPOINT);


  const getImageFullUrl=(url) =>{
    return BASE_URL+'/'+url;
  }

  const handleAddingCart = async (Id) =>{
     if(!isAuthenticated){
       alert('please login, to add product in to the cart');
       return;
     }
     try {
      const response = await addToCartApi.create({},{productId:Id});
      alert('Product added to cart, proceed to buy');
     } catch (error) {
      alert(error.message);
     }
     
  }

  return (
    <div key={key} className={`product-container ${className}`}>
        <img src={getImageFullUrl(Item?.imagePath)} alt='item' className="product-image"/>
        <div className='product-description'>
          <div>
            <h3 className="product-name">{Item?.name}</h3>
            <p className="product-details">{Item?.description}</p>
            <p className="price">&#8377;{Item?.price}</p>
          </div>
          {showAddCartButton && <button className="add-cart-button" onClick={()=>{handleAddingCart(Item.id)}}>Add to Cart</button>}
          {showDeleteButton && <button className="delete-button" onClick={()=>deleteProduct(Item.id)}>Delete</button>}
        </div>
    </div>
  )
}

export default ProductItem