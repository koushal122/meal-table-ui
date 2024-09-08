import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../layout/adminLayout'
import DropDown from '../../../Components/dropDown'
import './index.scss'
import * as constants from './constants.js'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../customHooks/useAuth.js'
import genericInterface from '../../../Util/genericInterface'
import { getCurrentTime } from '../../../helper/conversions/timeConversions.js'
import BookingCard from './component/bookingCard/index.js'

const Dashboard = () => {
  const upcomingBookingApi = genericInterface(constants.ALL_UPCOMING_BOOKING_ENDPOINT);
  const activeBookingApi = genericInterface(constants.ALL_ACTIVE_BOOKING_ENDPOINT);
  const startBookingApi = genericInterface(constants.START_BOOKING_ENDPOINT);
  const completeBookingApi = genericInterface(constants.COMPLETE_BOOKING_ENDPOINT);
  const [upcomingBookings,setUpcomingBookings] = useState([]);
  const [activeBookings,setActiveBookings] = useState([]);
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [currentTime, setCurrentTime] = useState();

  const fetchAllUpcomingBookings = async() =>{
    try {
      const st= await getCurrentTime();
      const response = await upcomingBookingApi.read({startTime:st});
      setUpcomingBookings(response.data);
    } catch (error) {
      console.log(error);
      if(error.response.status===401){
         logout();
         navigate('/login');
      }
    }
  }

  const fetchAllActiveBookings = async() =>{
    try {
      const response = await activeBookingApi.read();
      setActiveBookings(response.data);
    } catch (error) {
      console.log(error);
      if(error.response.status===401){
         logout();
         navigate('/login');
      }
    }
  }

  const startBooking = async(bookingId) =>{
    try {
      await startBookingApi.read({bookingId:bookingId});
      alert('Booking has been started.');
      fetchAllActiveBookings();
      fetchAllUpcomingBookings();
    } catch (error) {
      console.log(error);
      if(error.response.statusCode ===401){
        logout();
        navigate('/login');
      }
    }
  }

  const completeBooking = async(bookingId) =>{
    try {
      await completeBookingApi.create({},{bookingId:bookingId});
      alert('Booking completed');
      fetchAllActiveBookings();
      fetchAllUpcomingBookings();
    } catch (error) {
      console.log(error);
      if(error.response.statusCode ===401){
        logout();
        navigate('/login');
      }
    }
  }

  useEffect(()=>{
    fetchAllActiveBookings();
    fetchAllUpcomingBookings();
  },[]);

  return (
     <AdminLayout>
      <div>
        <DropDown title="Upcoming Bookings" data={upcomingBookings} RenderComponent={BookingCard} isBooked={true} startBooking={startBooking}/>
        <DropDown title="Active Bookings" data={activeBookings} RenderComponent={BookingCard} isActive={true} completeBooking={completeBooking}/>
      </div>
     </AdminLayout>
  )
}

export default Dashboard