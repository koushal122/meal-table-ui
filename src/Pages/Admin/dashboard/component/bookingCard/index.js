import React from 'react'
import { toCamelCase, getBookingStatusColor} from '../../../../../helper/conversions/stringConverts'
import { epochToLocalDateTime } from '../../../../../helper/conversions/timeConversions';
import './index.scss'

const BookingCard = ({item,isBooked, isActive, startBooking, completeBooking}) => {

    const seatsByTable = item?.seatsBooked?.reduce((acc, seat) => {
        if (!acc[seat.tabId]) {
            acc[seat.tabId] = [];
        }
        acc[seat.tabId].push(seat.id);
        return acc;
    }, {});

  return (
    <div className="booking-card">
        <p><strong>Booking ID:</strong> {item?.id}</p>
        <p><strong>Seats Booked:</strong> {item?.seats}</p>
        <p><strong>Start Time:</strong> {epochToLocalDateTime(item?.startTime)}</p>
        <p><strong>End Time:</strong> {epochToLocalDateTime(item?.endTime)}</p>
        <p><strong>Status:</strong> <span className={getBookingStatusColor(item?.status)}>{toCamelCase(item?.status)}</span></p>
        <p><strong>Amount Paid:</strong> {item?.amountPaid}</p>
        <p><strong>Total Amount:</strong> {item?.totalAmount}</p>
        <p><strong>Payment Status:</strong> {toCamelCase(item?.paymentStatus)}</p>
        <p><strong>Phone Number:</strong> {item?.phoneNumber}</p>

        {seatsByTable && Object.entries(seatsByTable).map(([tableId, seatIds]) => (
            <p key={tableId}>
                <strong>Table ID:</strong> {tableId} (Seat IDs: {seatIds.join(', ')})
            </p>
        ))}
        {
            isBooked && <button className='button' onClick={()=>startBooking(item?.id)}>Start Booking</button>
        }
        {
            isActive && <button className='button' onClick={()=>completeBooking(item?.id)}>Complete Booking</button>
        }
    </div>
  )
}

export default BookingCard