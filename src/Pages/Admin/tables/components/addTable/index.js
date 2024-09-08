import React, { useState } from 'react'
import * as constants from './constants.js'
import genericInterface from '../../../../../Util/genericInterface';

const AddTableForm = ({onSave}) => {
  const [seats,setSeats] =useState(0);
  const addTableApi = genericInterface(constants.ADD_TABLE_ENDPOINT);
  const [errorMessage,setErrorMessage] = useState('');

  const handleSubmit = async ()=>{
    const params={"capacity":seats}
    try {
        const response = await addTableApi.create({},params);
        alert(response.data);
        onSave();
    } catch (error) {
        setErrorMessage(error.response.message);
    }
    
  }

  return (
    <div className='add-table-form'>
        <p>Please enter number of seats in table</p>
        <input type='number' min={1} value={seats} onChange={(e)=>setSeats(e.target.value)}  required/>
        <p>{errorMessage}</p>
        <button onClick={handleSubmit} className='save-button'>Save</button>
    </div>
  )
}

export default AddTableForm