import React, { useState } from 'react'
import './index.scss';
import * as constants from './constants.js'
import genericInterface from '../../Util/genericInterface';
import { emailValidator, isDateTimeLessThanOneHourFromNow, isStartTimeLessOrEqualToEndTime, phoneNumberValidator } from '../../helper/validations/validations.js';
import useAuth from '../../customHooks/useAuth.js';
import Loader from '../loader/index.js';
import Popup from '../popup/index.js';
import { useSelector } from 'react-redux';
import BookingSuccess from '../bookingSucess/index.js';


const BookTable = ({className}) => {

  const availableTableCheckApi = genericInterface(constants.CHECK_AVAILABLE_TABLE_ENDPOINT);
  const bookTableApi = genericInterface(constants.BOOK_TABLE_ENDPOINT);
  const [requiredSeat, setRequiredSeat] = useState('');
  const [phone, setPhone] = useState('');
  const [availableSeats, setAvailableSeats] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated } = useAuth();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [message, setMessage] = useState('');
  const [showBooking,setShowBooking] =useState(false);

  const timeValidations = async (selectedStartTime,selectedEndTime) =>{
    if(!startTime||isDateTimeLessThanOneHourFromNow(selectedStartTime)){
      setMessage('Please select start time more than one hour from now');
      setShowPopup(true);
      return false;
   }
   if(!endTime||isDateTimeLessThanOneHourFromNow(selectedEndTime)){
      setMessage('Please select end time more than one hour from now');
      setShowPopup(true);
      return false;
   }
   if(!isStartTimeLessOrEqualToEndTime(selectedStartTime,selectedEndTime)){
      setMessage('End time should be greater than start time');
      setShowPopup(true);
      return false;
   }
   return true;
  }

  const handleCheckingTable = async (event) =>{
    event.preventDefault();
    if (!requiredSeat) {
      alert('Please enter the number of seats.');
      return;
    }
    const selectedStartTime = new Date(startTime).getTime();
    const selectedEndTime = new Date(endTime).getTime();
    if(!await timeValidations(selectedStartTime,selectedEndTime)) return;
    setLoading(true);
    const response=await availableTableCheckApi.read({startTime:selectedStartTime,endTime:selectedEndTime});
    const tablesWithId = response.data;
    let totalSeats = 0;
    Object.entries(tablesWithId).forEach(([key,value])=>{
      totalSeats+=value;
    });
    setLoading(false);
    if (requiredSeat > totalSeats) {
      alert(`Currently, the number of seats you entered is not available. Maximum available seats are ${totalSeats}.`);
      setIsAvailable(false);
    } else {
      setAvailableSeats(totalSeats);
      setIsAvailable(true);
      alert(`Required seats is available , please process with booking`);
    }
  }

  const handleBookingTable = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setMessage('Please login to book the table');
      setShowPopup(true);
      return;
    }
    const selectedStartTime = Math.floor(new Date(startTime).getTime()/1000);
    const selectedEndTime = Math.floor(new Date(endTime).getTime());
    if(!await timeValidations(selectedStartTime,selectedEndTime)) return;
    if (!phone || !phoneNumberValidator(phone)) {
      alert('Please enter a valid 10 digit phone number.');
      return;
    }
    if(!isAvailable){
      alert('Please check seat availability before booking table');
      return;
    }
    const bookTablePayload = {
       requiredSeats : requiredSeat,
       amountPaid : 800,
       totalPrice:900,
       startTime : selectedStartTime,
       endTime : selectedEndTime,
       phoneNumber : phone
    }
    try {
      const response = await bookTableApi.create(bookTablePayload);
      setMessage(response.data);
      setShowBooking(true);
    } catch (error) {
      setMessage(error.response.data.message);
      setShowPopup(true);
    }
  };



  return (
    <div className={`book-table ${className}`}>
        <h3>BOOK A TABLE</h3>
        <form onSubmit={handleCheckingTable}>
            <div className="date-time-seat">
                <input className='seat-count' required placeholder='Number of Seats' type='number' value={requiredSeat} onChange={(e)=> setRequiredSeat(e.target.value)} min={1}></input>
                <input className='start-time'  required placeholder='StartTime' type='datetime-local' value={startTime} onChange={(e)=>setStartTime(e.target.value)}></input>
                <input className='end-time' required placeholder='EndTime' type='datetime-local' value={endTime} onChange={(e)=>setEndTime(e.target.value)} ></input>
            </div>
            <div className="check-table-container">
                <button type='submit' className="check-table" onClick={handleCheckingTable}>
                   {loading ? <Loader size='small' color='#000000' /> : 'Check Availability'}
                </button>
            </div>
        </form>
        <form onSubmit={handleBookingTable}>
            <div className="book-table-phone">
                <input placeholder='Phone' type='tel' value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
                <button className='book-table-button'>Book Table</button>
            </div>
        </form>
        {showPopup && (
        <Popup
          message={message}
          onClose={() => setShowPopup(false)}
        />
      )}
      {showBooking && (
        <BookingSuccess
          bookingResponse={message}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  )
}

export default BookTable