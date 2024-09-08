import React from 'react'
import './index.scss'
import { toCamelCase, getBookingStatusColor} from '../../helper/conversions/stringConverts';
import { epochToLocalDateTime } from '../../helper/conversions/timeConversions';

const BookingSuccess = ({bookingResponse,onClose,showHeader=true,handleCancelBooking}) => {
    
    const seatsByTable = bookingResponse?.seatsBooked?.reduce((acc, seat) => {
        if (!acc[seat.tabId]) {
            acc[seat.tabId] = [];
        }
        acc[seat.tabId].push(seat.id);
        return acc;
    }, {});


    return (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={onClose}>X</button>
            <div className="popup-message">
                { showHeader && <p className='booking-header'><strong>Congratulations, Your seats booked successfully</strong></p>}
                <p><strong>Booking ID:</strong> {bookingResponse?.id}</p>
                <p><strong>Seats Booked:</strong> {bookingResponse?.seats}</p>
                <p><strong>Start Time:</strong> {epochToLocalDateTime(bookingResponse?.startTime)}</p>
                <p><strong>End Time:</strong> {epochToLocalDateTime(bookingResponse?.endTime)}</p>
                <p><strong>Status:</strong> <span className={getBookingStatusColor(bookingResponse?.status)}>{toCamelCase(bookingResponse?.status)}</span></p>
                <p><strong>Amount Paid:</strong> {bookingResponse?.amountPaid}</p>
                <p><strong>Total Amount:</strong> {bookingResponse?.totalAmount}</p>
                <p><strong>Payment Status:</strong> {toCamelCase(bookingResponse?.paymentStatus)}</p>
                <p><strong>Phone Number:</strong> {bookingResponse?.phoneNumber}</p>

                {seatsByTable && Object.entries(seatsByTable).map(([tableId, seatIds]) => (
                    <p key={tableId}>
                        <strong>Table ID:</strong> {tableId} (Seat IDs: {seatIds.join(', ')})
                    </p>
                ))}
                {(bookingResponse.status==='BOOKED') && <button className='cancel-button red-color-text' onClick={()=>handleCancelBooking(bookingResponse?.id)}>Cancel Booking</button>}
            </div>
          </div>
        </div>
      );
}

export default BookingSuccess





