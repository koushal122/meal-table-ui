import React, { useEffect, useState } from 'react'
import Header from '../../Components/navbar'
import './index.scss'
import CartItem from '../../Components/cartItem'
import * as constants from './constants'
import Unauthorized from '../../Components/unauthorized'
import useAuth from '../../customHooks/useAuth'
import genericInterface from '../../Util/genericInterface'
import { useSelector } from 'react-redux'
import CheckoutAddress from '../../Components/checkoutAddress'
import { useNavigate } from 'react-router-dom'
import App from '../../App'
import AppLayout from '../../layout/appLayout'

const Cart = () => {
  const getCartByUserApi = genericInterface(constants.GET_CART_BY_USER_ENDPOINT);
  const updateQuantityApi = genericInterface(constants.UPDATE_QUANTITY_ENDPOINT);
  const removeProductApi = genericInterface(constants.REMOVE_PRODUCT_ENDPOINT);
  const getAllAddressApi = genericInterface(constants.GET_ALL_USER_ADDRESS_ENDPOINT);
  const addNewAddressApi = genericInterface(constants.ADD_NEW_ADDRESS_ENDPOINT);
  const createNewOrderApi = genericInterface(constants.CREATE_NEW_ORDER_ENDPOINT);
  const [cartItems, setCartItems] =useState({});
  const {logout} = useAuth();
  const isAuthenticated = useSelector((state) => state.authentication.isUserAuthenticated);
  const userEmail = useSelector((store)=> store.authentication.userEmail);
  const [showAddresses,setShowAddresses] = useState(false);
  const [userAddress,setUserAddress] = useState();
  const navigate = useNavigate();

  const updateQuantity = async (productId, quantity) => {
     try {
      let response = {};
       if(quantity === 0) response = await removeProductApi.delete({productId:productId});
       else response = await updateQuantityApi.create({},{productId:productId, quantity: quantity});
       await sortByProductId(response.data.products);
       setCartItems(response.data);
     } catch (error) {
      if(error.response.status===401) logout();
      else console.log(error);
     }
  }

  const removeProduct = async(productId) =>{
    try {
      const response = await removeProductApi.delete({productId:productId});
      await sortByProductId(response.data.products);
      setCartItems(response.data);
    } catch (error) {
     if(error.response.status===401) logout();
     else console.log(error);
    }
  }

  const fetchAllUserAddresses= async()=>{
    try {
      const response = await getAllAddressApi.read();
      setUserAddress(response.data);
    } catch (error) {
     if(error.response.status===401) logout();
     else console.log(error);
    }
  }

  const sortByProductId = async(products) =>{
    products.sort((a,b) => a.id - b.id);
  }

  const addNewAddress = async (formData,onClose) =>{
    try {
      const newAddresPayload = formData;
      const response = await addNewAddressApi.create(newAddresPayload,{});
      if(response.status===200){
        fetchAllUserAddresses();
        onClose();
      }else{
        alert(response.data.message);
      }
    } catch (error) {
      if(error.response.status===401) logout();
      else console.log(error);
    }
  }

  const createOrder = async(addressId) =>{
    const productWithQuantities = [];
    cartItems.products.forEach(element => {
      const poductQuantity = {
        product:element,
        quantity:cartItems.productQuantityWithId[element?.id]
      }
      productWithQuantities.push(poductQuantity);
    });
    const createOrderPayload = {
      totalPrice : cartItems.totalPrice,
      addressId : addressId,
      productWithQuantities:productWithQuantities
    }
    try {
      const response = await createNewOrderApi.create(createOrderPayload,{});
      if(response.status === 200){
        alert("Your order has been created, please wait for confirmation from restaurant");
        setCartItems({});
        navigate('/')
      }
    } catch (error) {
      console.log("error is "+error);
    }
  }

  useEffect(()=>{
      if(!isAuthenticated) return;
      const fetchData = async () => {
        const params = {userEmail:userEmail}
        try {
          const response = await getCartByUserApi.read(params);
          await sortByProductId(response.data.products);
          setCartItems(response.data);
        } catch (error) {
          if(error.response.status===401) logout();
          else console.log(error);
        }
      }
      try {
        fetchData();
        fetchAllUserAddresses();
      } catch (error) {
        console.log(error);
        
      }
      
  },[isAuthenticated])

  return (
   <AppLayout showFooter={false}>
    {
      isAuthenticated?
        (
          <div className='cart-body'>
            <p className='cart-header'>Your cart items</p>
            {
                cartItems?.products?.map((value)=>{
                  return <CartItem {...value} quantity={cartItems?.productQuantityWithId} updateQuantity={updateQuantity} removeProduct={removeProduct}/>;
                })
            }
            <div className='price-checkout-button'>
              <div className='total-price'>
                <span>Total Value :- </span>
                <span>&#8377;{cartItems?.totalPrice}</span>
              </div>
              <button className='checkout' onClick={()=>setShowAddresses(true)}>Checkout</button>
            </div>
            
          </div>
        ):<Unauthorized/>
    }
    {
         (isAuthenticated && showAddresses) && <CheckoutAddress addresses={userAddress} addNewAddress={addNewAddress} deliver={createOrder}/>
    }
   
   </AppLayout>
  )
}

export default Cart