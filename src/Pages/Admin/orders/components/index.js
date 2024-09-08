import React from 'react'
import { epochToLocalDateTime } from '../../../../helper/conversions/timeConversions';
import { getBookingStatusColor, toCamelCase } from '../../../../helper/conversions/stringConverts';
import './index.scss'


const OrderCard = ({item,confirmOrder,dispatchOrder,rejectReturn,rejectCancel,approveReturn,approveCancel,delivered,outForPickUp,returned}) => {
  return (
    <div className="order-card">
        <p><strong>Order ID: </strong> {item?.id}</p>
        <p><strong>Status:</strong> <span className={getBookingStatusColor(item?.orderStatus)}>{toCamelCase(item?.orderStatus)}</span></p>
        <p><strong>Total Items:</strong> {item?.orderProductQuantityList?.length}</p>
        <p><strong>Delivery Address: </strong> {item?.deliveryAddress}</p>
        {!item?.deliveryNotes && <p><strong>Delivery Notes: </strong> {item?.deliveryNotes}</p>}
        <p><strong>User : </strong> {item?.user?.userEmail}</p>
        <p><strong>Amount Paid:</strong> {item?.amountPaid}</p>
        <p><strong>Total Amount:</strong> {item?.totalPrice}</p>
        <p className='m-4'><strong>Order details :</strong></p>
        <div className='order-details'>
            <p className='m-4'><strong>Requested Time: </strong> {epochToLocalDateTime(item?.requestedTime)}</p>
            {item?.orderConfirmed!==0 && <p className='m-4'><strong>Order Confirmed:</strong> {epochToLocalDateTime(item?.orderConfirmed)}</p>}
            {item?.orderDispatched!==0 && <p className='m-4'><strong>Order Dispatched:</strong> {epochToLocalDateTime(item?.orderDispatched)}</p>}
            {item?.cancelRequested!==0 && <p className='m-4'><strong>Cancel Requested:</strong> {epochToLocalDateTime(item?.cancelRequested)}</p>}
            {item?.cancelRejected!==0 && <p className='m-4'><strong>Cancel Rejected:</strong> {epochToLocalDateTime(item?.cancelRejected)}</p>}
            {item?.cancelApproved!==0 && <p className='m-4'><strong>Cancel Approved:</strong> {epochToLocalDateTime(item?.cancelApproved)}</p>}
            {item?.delivered!==0 && <p className='m-4'><strong>Order Delivered:</strong> {epochToLocalDateTime(item?.delivered)}</p>}
            {item?.returnRequested!==0 && <p className='m-4'><strong>Return Requested:</strong> {epochToLocalDateTime(item?.returnRequested)}</p>}
            {item?.returnRejected!==0 && <p className='m-4'><strong>Return Rejected:</strong> {epochToLocalDateTime(item?.returnRejected)}</p>}
            {item?.outForPickUp!==0 && <p className='m-4'><strong>Out For Pickup:</strong> {epochToLocalDateTime(item?.outForPickUp)}</p>}
            {item?.returnApproved!==0 && <p className='m-4'><strong>Return Approved:</strong> {epochToLocalDateTime(item?.returnApproved)}</p>}
            {item?.returned!==0 && <p className='m-4'><strong>Returned:</strong> {epochToLocalDateTime(item?.returned)}</p>}
        </div>
        {
            item?.orderStatus==='BOOKED' &&
            (<><button className='button m-4' onClick={()=>confirmOrder(item?.id)}>Confirm</button>
                <button className='button'>Not available</button></>
            )
        }
        {
            item?.orderStatus==='CONFIRMED' && <button className='button' onClick={()=>dispatchOrder(item?.id)}>Dispatch</button>
        }
        {
            item?.orderStatus==='CANCEL_REQUESTED' && 
            (<><button className='button m-4' onClick={()=>approveCancel(item?.id)}>Approve</button>
              <button className='button' onClick={()=>rejectCancel(item?.id)}>Reject</button></>
            )
        }
        {
            item?.orderStatus==='RETURN_REQUESTED' && 
            (<><button className='button m-4' onClick={()=>approveReturn(item?.id)}>Approve</button>
              <button className='button' onClick={()=>rejectReturn(item?.id)}>Reject</button></>
            )
        }
        {
            (item?.orderStatus==='DISPATCHED' || item?.status==='CANCEL_REJECTED')  && 
            (<><button className='button' onClick={()=>delivered(item?.id)}>Delivered</button></>
            )
        }
        {
            item?.orderStatus==='RETURN_APRROVED' && 
            (<><button className='button' onClick={()=>outForPickUp(item?.id)}>Out for Pickup</button></>
            )
        }
        {
            item?.orderStatus==='OUT_FOR_PICKUP' && 
            (<><button className='button m-4' onClick={()=>returned(item?.id)}>Returned</button>
               <button className='button'>Customer Not Available</button></>
            )
        }
        
    </div>
  )
}

export default OrderCard