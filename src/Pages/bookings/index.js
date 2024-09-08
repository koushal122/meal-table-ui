import React, { useEffect, useState } from 'react'
import AppLayout from '../../layout/appLayout'
import './index.scss';
import * as constants from './constants.js'
import genericInterface from '../../Util/genericInterface';
import BookingSuccess from '../../Components/bookingSucess/index.js';
import Popup from '../../Components/popup/index.js';
import { toCamelCase,getBookingStatusColor } from '../../helper/conversions/stringConverts.js';
import { epochToLocalDateTime } from '../../helper/conversions/timeConversions.js';
import { logout } from '../../helper/Slices/authSlice.js';
import useAuth from '../../customHooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const allBookingApi = genericInterface(constants.ALL_BOOKINGS_ENDPOINT);
  const cancelBookingApi = genericInterface(constants.CANCEL_BOOKING_ENDPOINT);
  const [bookings,setBookings] = useState([]);
  const [showBookingDetails,setShowBookingDetails]= useState(false);
  const [message,setMessage] = useState();
  const [showPopUp,setShowPopUp] =useState(false);
  const [bookingDetail,setBookingDetail]=useState();
  const {logout} = useAuth();
  const navigate = useNavigate();

  const fetchAllBookings = async () =>{
    try {
        const response = await allBookingApi.read();
        setBookings(response.data);
    } catch (error) {
        console.log(error);
        if(error.response.status===401){
            logout();
            navigate('/login');
        }
    }
    
  }

  useEffect(()=>{
    fetchAllBookings();
  },[]);

  const handleBookingDetailsClick = (bookingDetail) =>{
     setBookingDetail(bookingDetail);
     setShowBookingDetails(true);
  }

  const closeBookingDetailsPopUp = () =>{
     setShowBookingDetails(false);
  }

  const closePopUp = () =>{
    setShowPopUp(false);
  }

  const handleCancelBooking = async(Id) =>{
    try {
        const response = await cancelBookingApi.create({},{bookingId:Id});
        setShowBookingDetails(false);
        setMessage('Your booking has been cancelled.');
        setShowPopUp(true);
        fetchAllBookings();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <AppLayout>
        <p className='booking-header'>Your table bookings</p>
        <div className='booking-body'>
            {
                bookings.length ===0 ? <p className='no-data'>Please book table.</p> :
                bookings.map((booking)=>{
                    return (
                        <div className='booking-container'>
                            <div className='booking-container-header'>
                                <p><strong>Booking Id :- </strong>{booking.id}</p>
                                <p><strong>Status :- </strong><span className={getBookingStatusColor(booking.status)}>{toCamelCase(booking.status)}</span></p>
                                <p><strong>Start time :- </strong>{epochToLocalDateTime(booking.startTime)}</p>
                                <button className='booking-details-button' onClick={()=>handleBookingDetailsClick(booking)}>View details</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {
            showBookingDetails && <BookingSuccess bookingResponse={bookingDetail} onClose={closeBookingDetailsPopUp} showHeader={false} handleCancelBooking={handleCancelBooking}/>
        }
        {
            showPopUp && <Popup message={message} onClose={closePopUp}/>
        }
    </AppLayout>
  )
}

export default Bookings