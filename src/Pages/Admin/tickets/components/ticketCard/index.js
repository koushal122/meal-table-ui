import React from 'react'
import './index.scss'
import { toCamelCase } from '../../../../../helper/conversions/stringConverts'

const TicketCard = ({item,resolveTicket}) => {
  return (
    <div className="ticket-card">
        <h4><strong>Subject :- </strong>{item.subject}</h4>
        <p><strong>Message :- </strong>{item.message}</p>
        <p><strong>User Email :- </strong>{item.user.userEmail}</p>
        <p><strong>Status :- </strong>{toCamelCase(item.ticketStatus)}</p>
        {item.ticketStatus==='OPEN' && <button className='button' onClick={()=>resolveTicket(item.id)}>Mark as Resolve</button>}
    </div>
  )
}

export default TicketCard