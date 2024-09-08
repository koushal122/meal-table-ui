
export const toCamelCase = (str) => {
    return str
      .toLowerCase() 
      .split('_') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
}

export const getBookingStatusColor = (bookingStatus) =>{
    if(bookingStatus === 'BOOKED') return 'green-color-text';
    else return 'red-color-text';
}

export const getOrderStatusColor = (orderStatus) =>{
    if(orderStatus === 'BOOKED'|| orderStatus==='DISPATCHED'||orderStatus === 'DISPATCHED'||orderStatus === 'DELIVERED'||orderStatus === 'CANCEL_APPROVED'||orderStatus === 'RETURN_APPROVED'||orderStatus==='CONFIRMED') return 'green-color-text';
    else return 'red-color-text';
}