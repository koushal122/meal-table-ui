import React, { useState } from 'react'
import './index.scss'
import useAuth from '../../customHooks/useAuth'
import genericInterface from '../../Util/genericInterface';
import * as constants from './constants.js'
const ContactUS = () => {
     const {isAuthenticated} =useAuth();
     const [name,setName] = useState();
     const [phone,setPhone] = useState();
     const [message,setMessage] = useState();
     const [subject,setSubject] = useState();
     const createTicketApi = genericInterface(constants.CREATE_TICKET_ENDPOINT);

     const handleSendMessage = async () =>{
          if(!isAuthenticated){
               alert('Please login to raise any ticket.');
               return;
          }else if(!name||!phone||!message||!subject){
               alert('Please fill all the fields');
               return;
          }
          try {
               const payload = {
                    message:message,
                    subject:subject,
                    phoneNumber :phone
               }
               const response = await createTicketApi.create(payload,{});
               alert(`Your ticket was created successfully, please go to my tickets section for status update.`)
          } catch (error) {
               console.log(error);
          }
     }

  return (
    <div className='contact-us-container'>
        <div className='contact-information'>
               <h3>Contact Information</h3>
               <div>
                    <span className='key'>Adress:</span>
                    <span className='value'>198 West 21th Street, Suite 721 New York NY 10016</span>
               </div>
               <div>
                    <span className='key'>Phone:</span>
                    <span className='value'>+ 1235 2355 98</span>
               </div>
               <div>
                    <span className='key'>Email:</span>
                    <span className='value'>Koushaljha889@gmail.com</span>
               </div>
               <div>
                    <span className='key'>Website:</span>
                    <span className='value'> yoursite.com</span>
               </div>
        </div>
        <div className='send-message-container'>
           <div className='name-email'>
            <input type='text' placeholder='Name' className='style-inputs' onChange={(e)=>setName(e.target.value)}></input>
            <input type='tel' placeholder='Phone' className='style-inputs' onChange={(e)=>setPhone(e.target.value)}></input>
           </div>
           <input type='text' placeholder='Subject' className='style-inputs' onChange={(e)=>setSubject(e.target.value)}></input>
           <textarea type='text' placeholder='Message' className='style-inputs' onChange={(e)=>setMessage(e.target.value)}></textarea>
           <button className='send-message-button' onClick={()=>handleSendMessage()} >Send Message</button>
        </div>
    </div>
  )
}

export default ContactUS