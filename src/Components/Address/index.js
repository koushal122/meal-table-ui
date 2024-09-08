import React, { useState } from 'react'
import './index.scss'

const Address = ({address,checked,deliver}) => {
  return (
    <div className='address-container'>
        <p className='name-phone'>{`${address?.name} ${address.phoneNumber}`}</p>
        <p>{`${address?.buildingName}, ${address?.townName}, ${address?.districtName}, ${address?.stateName} - ${address?.pincode}`}</p>
        {checked==address?.id && <button className='button' onClick={()=>deliver(address?.id)}>Deliver here</button>}
    </div>
  )
}

export default Address