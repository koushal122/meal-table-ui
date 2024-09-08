import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../layout/adminLayout'
import DropDown from '../../../Components/dropDown'
import * as constants from './constants.js'
import genericInterface from '../../../Util/genericInterface'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../customHooks/useAuth'
import TicketCard from './components/ticketCard'

const Tickets = () => {
  const allOpenTicketsApi = genericInterface(constants.GET_ALL_OPEN_TICKET_LIST_ENDPOINT);
  const allClosedTicketApi = genericInterface(constants.GET_ALL_RESOLVED_TICKET_LIST_ENDPOINT);
  const resolveTicketApi = genericInterface(constants.MARK_TICKET_AS_RESOLVED_ENDPOINT);
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [unresolvedTickets,setUnresolvedTickets] = useState([]);
  const [resolvedTickets,setResolvedTickets] = useState([]);

  const fetchAllOpenTickets = async () =>{
    try {
      const response = await allOpenTicketsApi.read();
      setUnresolvedTickets(response.data);
    } catch (error) {
      console.log(error);
      if(error.response.status===401){
         logout();
         navigate('/login');
      }
    }
  }

  const fetchAllClosedTickets = async () =>{
    try {
      const response = await allClosedTicketApi.read();
      setResolvedTickets(response.data);
    } catch (error) {
      console.log(error);
      if(error.response.status===401){
         logout();
         navigate('/login');
      }
    }
  }

  const markAsResolved = async(id) =>{
    try {
      await resolveTicketApi.put({},{ticketId:id});
      alert('Ticket Marked as resolved.');
      fetchAllOpenTickets();
      fetchAllClosedTickets();
    } catch (error) {
      console.log(error);
      if(error.response.status===401){
         logout();
         navigate('/login');
      }
    }
  }
  

  useEffect (()=>{
    fetchAllOpenTickets();
    fetchAllClosedTickets();
  },[]);

  return (
    <AdminLayout>
        <p className='header'>Tickets</p>
        <div>
          <DropDown title="Unresolved Tickets" data={unresolvedTickets} RenderComponent={TicketCard} resolveTicket={markAsResolved}/>
          <DropDown title="Resolved Tickets" data={resolvedTickets} RenderComponent={TicketCard} />
       </div>
    </AdminLayout>
  )
}

export default Tickets