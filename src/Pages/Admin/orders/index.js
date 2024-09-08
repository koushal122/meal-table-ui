import React, { useEffect, useState } from 'react'
import './index.scss'
import * as constants from './constants.js'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../../layout/adminLayout/index.js'
import genericInterface from '../../../Util/genericInterface.js'
import DropDown from '../../../Components/dropDown/index.js'
import OrderCard from './components/index.js'
import useAuth from '../../../customHooks/useAuth.js'

const AdminOrder = () => {
    const bookedOrderApi = genericInterface(constants.GET_ALL_BOOKED_ORDER_ENDPOINT);
    const allConfirmedOrdersApi = genericInterface(constants.GET_ALL_CONFIRMED_ORDER_ENDPOINT);
    const allDispatchedOrdersApi = genericInterface(constants.GET_ALL_DISPATCHED_ORDER_ENDPOINT);
    const allOutForPickUpOrdersApi = genericInterface(constants.GET_ALL_OUT_FOR_PICKUP_ORDERD_ENDPOINT);
    const confirmOrderApi = genericInterface(constants.CONFIRM_ORDER_ENDPOINT);
    const dispatchOrderApi = genericInterface(constants.DISPATCH_ORDER_ENDPOINT);
    const cancelRequestedApi = genericInterface(constants.GET_ALL_CANCEL_REQUESTED_ORDER_ENDPOINT);
    const returnRequestedApi = genericInterface(constants.GET_ALL_RETURN_REQUESTED_ORDER_ENDPOINT);
    const approveCancelRequestApi = genericInterface(constants.APPROVE_CANCEL_REQUEST_ENDPOINT);
    const rejectCancelRequestApi = genericInterface(constants.REJECT_CANCEL_REQUEST_ENDPOINT);
    const deliverOrderApi = genericInterface(constants.DELIVER_ORDER_ENDPOINT);
    const approveReturnRequestApi = genericInterface(constants.APPROVE_RETURN_REQUEST_ENDPOINT);
    const rejectReturnRequestApi = genericInterface(constants.REJECT_RETURN_REQUEST_ENDPOINT);
    const outForPickupApi = genericInterface(constants.OUT_FOR_PICKUP_ENDPOINT);
    const [bookedOrders,setAllBookedOrders] = useState([]);
    const [confirmOrders,setAllConfirmOrders] = useState([]);
    const [cancelRequestedOrders,setCancelRequestedOrders] = useState([]);
    const [dispatchedOrders,setAllDispatchedOrders] = useState([]);
    const [deliveredOrders,setAllDeliveredOrders] = useState([]);
    const [returnRequestedOrders,setAllReturnedRequestedOrders] = useState([]);
    const [outForPickupOrders,setAllOutForPickupOrders] = useState([]);
    const [returnOrders,setAllReturnedOrders] = useState([]);
    const navigate = useNavigate();
    const {logout} = useAuth();

    const fetchAllBookedOrders = async() =>{
        try {
            const response = await bookedOrderApi.read();
            setAllBookedOrders(response.data);
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const fetchAllConfirmedOrders = async() =>{
        try {
            const response = await allConfirmedOrdersApi.read();
            setAllConfirmOrders(response.data);
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const fetchAllDispatchedOrders = async() =>{
        try {
            const response = await allDispatchedOrdersApi.read();
            setAllDispatchedOrders(response.data);
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const fetchAllCancelRequestedOrders = async() =>{
        try {
            const response = await cancelRequestedApi.read();
            setCancelRequestedOrders(response.data);
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const fetchAllReturnRequestedOrders = async() =>{
        try {
            const response = await returnRequestedApi.read();
            setAllReturnedRequestedOrders(response.data);
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const fetchAllOutForPickUpOrders = async() =>{
        try {
            const response = await allOutForPickUpOrdersApi.read();
            setAllOutForPickupOrders(response.data);
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const confirmOrder = async(id)=>{
        try {
            await confirmOrderApi.put({},{orderId:id});
            fetchAllBookedOrders();
            fetchAllConfirmedOrders();
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const dispatchOrder = async(id)=>{
        try {
            await dispatchOrderApi.put({},{orderId:id});
            fetchAllDispatchedOrders();
            fetchAllConfirmedOrders();
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const rejectCancel = async(id)=>{
        try {
            await rejectCancelRequestApi.put({},{orderId:id});
            fetchAllCancelRequestedOrders();
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const approveCancel = async(id)=>{
        try {
            await approveCancelRequestApi.put({},{orderId:id});
            fetchAllCancelRequestedOrders();
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const deliverOrder = async(id)=>{
        try {
            await deliverOrderApi.put({},{orderId:id});
            fetchAllDispatchedOrders();
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const rejectReturnRequest = async(id)=>{
        try {
            await rejectReturnRequestApi.put({},{orderId:id});
            fetchAllReturnRequestedOrders();
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const approveReturnRequest = async(id)=>{
        try {
            await approveReturnRequestApi.put({},{orderId:id});
            fetchAllReturnRequestedOrders();
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }

    const outForPickUp = async(id)=>{
        try {
            await outForPickupApi.put({},{orderId:id});
            fetchAllOutForPickUpOrders();
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login');
            }
            else alert(error.response.data.message);
        }
    }


    

    useEffect(()=>{
        fetchAllBookedOrders();
        fetchAllConfirmedOrders();
        fetchAllCancelRequestedOrders();
        fetchAllDispatchedOrders();
        fetchAllReturnRequestedOrders();
        fetchAllOutForPickUpOrders();
    },[]);

  return (
     <AdminLayout>
        <DropDown title="Booked orders" data={bookedOrders} onClick={fetchAllBookedOrders} RenderComponent={OrderCard} confirmOrder={confirmOrder}/>
        <DropDown title="Confirmed orders" data={confirmOrders} RenderComponent={OrderCard} dispatchOrder={dispatchOrder}/>
        <DropDown title="Dispatched orders" data={dispatchedOrders} RenderComponent={OrderCard} delivered={deliverOrder}/>
        <DropDown title="Cancel Requested orders" data={cancelRequestedOrders} RenderComponent={OrderCard} rejectCancel={rejectCancel} approveCancel={approveCancel}/>
        <DropDown title="Return Requested orders" data={returnRequestedOrders} RenderComponent={OrderCard} rejectReturn={rejectReturnRequest} approveReturn={approveReturnRequest}/>
        <DropDown title="Out for Pickup orders" data={outForPickupOrders} RenderComponent={OrderCard} outForPickUp={outForPickUp}/>
        <DropDown title="Cancelled orders" data={bookedOrders} RenderComponent={OrderCard}/>
        <DropDown title="Returned orders" data={bookedOrders} RenderComponent={OrderCard}/>
    </AdminLayout>
  )
}

export default AdminOrder