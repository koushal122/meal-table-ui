import React, { useState } from 'react'
import './index.scss'
import Address from '../Address'
import AddNewAddress from '../addNewAddress';

const CheckoutAddress = ({addresses,addNewAddress,deliver}) => {
  const [checkedbox,setCheckedbox] =useState();
  const [showAddNewAddressPopUp,setShowAddNewAddressPopUp] =useState(false);

  const handleCheckboxChange = (event)=>{
    setCheckedbox(event.target.value);
  }

  const onClose = () =>{
    setShowAddNewAddressPopUp(false);
  }
  return (
    <div className='checkout-address-container'>
        <p className='checkout-address-header'>Delivery Address</p>
        {
           addresses.map((address) => {
            return (
              <div className='adress-container'>
                <span><input type='radio' name='delivery-radio' value={address?.id} onChange={handleCheckboxChange}/></span> 
                <Address address={address} checked={checkedbox} deliver={deliver}/>
              </div>
            )
           })
        }
        <button onClick={()=>setShowAddNewAddressPopUp(true)} className='button add-new-address'>Add New Address</button>
        {
          showAddNewAddressPopUp && <AddNewAddress onClose={onClose} addNewAddress={addNewAddress}/>
        }
    </div>
  )
}

export default CheckoutAddress