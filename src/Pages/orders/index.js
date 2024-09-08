import React, { useEffect, useState } from 'react'
import './index.scss'
import AppLayout from '../../layout/appLayout'
import genericInterface from '../../Util/genericInterface'
import * as constants from './constants.js'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../config/index.js'
import { getOrderStatusColor, toCamelCase } from '../../helper/conversions/stringConverts.js'
import { epochToLocalDateTime } from '../../helper/conversions/timeConversions.js'
import useAuth from '../../customHooks/useAuth.js'

const Orders = () => {
  const allOrdersApi = genericInterface(constants.ALL_ORDERS_BY_USER_ENDPOINT);
  const cancelOrderApi = genericInterface(constants.CANCEL_ORDER_REQUEST_ENDPOINT);
  const [ordersList,setOrdersList] = useState([]);
  const navigate = useNavigate();
  const {logout} =useAuth();


  const fetchAllOrders = async() => {
     try {
        const response = await allOrdersApi.read();
        setOrdersList(response.data);
     } catch (error) {
        console.log(error);
     }
  }

  const cancelOrderRequest = async(orderId) =>{
    try {
        const response = await cancelOrderApi.put({},{orderId: orderId});
        alert(response.data);
        fetchAllOrders();
     } catch (error) {
        console.log(error);
        if(error.response.status===401){
            logout();
            navigate('/login')
        }
     }
  }

  const getImageFullUrl=(url) =>{
    return BASE_URL+'/'+url;
  }

  useEffect(()=>{
    fetchAllOrders();
  },[]);


  return (
    <AppLayout>
        <p className='order-header'>Your orders</p>
        <div className='order-body'>
            {
                ordersList.length ===0 ? <p className='no-data'>You haven't Order anything yet.</p> :
                ordersList.map((order)=>{
                    return  (
                    <div className='order-container'>
                        <div className='order-container-header'>
                            <p><strong>Order Placed :-</strong>{epochToLocalDateTime(order.requestedTime)}</p>
                            <p><strong>Total Price :-</strong>{order.totalPrice}</p>
                            <p><strong>Ship to :-</strong>{order?.address?.name}</p>
                            <p><strong>Order Id :-</strong>{order.id}</p>                        
                        </div>
                        <div>
                        <div className='order-products-header'>
                            <p className={getOrderStatusColor(order.orderStatus)}><strong>{toCamelCase(order.orderStatus)}</strong></p>
                            <p><strong>Name</strong></p>
                            <p><strong>Quantity</strong></p>
                            <p><strong>Price</strong></p>
                        </div>
                        {
                            order.orderProductQuantityList.map((product)=>{
                                return (
                                    <div className='order-product-list'>
                                        <img alt='Item' src={getImageFullUrl(product.product.imagePath)} className='order-image'/>
                                        <p>{product.product.name}</p>
                                        <p>{product.quantity}</p>
                                        <p>{product.quantity*product.product.price}</p>
                                    </div>
                                )
                            })
                        }
                        <button className='button'>View Order Details</button>
                        { (order.orderStatus==='BOOKED'||order.orderStatus==='CONFIRMED') && <button className='button cancel-order-button' onClick={()=>cancelOrderRequest(order?.id)}>Cancel Order</button>}
                        </div>
                    </div>
                    )
                })
            }
        </div>
    </AppLayout>
  )
}

export default Orders