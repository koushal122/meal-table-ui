import React, { useState } from 'react';
import genericInterface from '../../../../../Util/genericInterface';
import * as constants from './constants.js';
import './index.scss'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../../customHooks/useAuth.js';

const AddProductForm = ({ onSave }) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const addProductApi = genericInterface(constants.ADD_PRODUCT_ENDPOINT);
    const navigate=useNavigate();
    const {logout} = useAuth();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('type',type);
        formData.append('price',price);
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]);
        }
        formData.append('image', image);
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]);
        }

        try {
            const response = await addProductApi.create(formData,{},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product added successfully');
            onSave();
        } catch (error) {
            if(error.response.status===401){
                logout();
                 navigate('/login');
            }
            console.log(error);
            setMessage(`Error: ${error.response.data}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='add-product-form'>
            <label>Type</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} required /> <br/>

            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br/>

            <label>Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} required /><br/>

            <label>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required  min={1} max={2000} /><br/>

            <label>Image</label>
            <input type="file" onChange={handleImageChange} /><br/>

            {message && <p className='error-message'>{message}</p>}

            <div className="modal-buttons">
                <button type="submit" className="save-button">Save</button>
            </div>
        </form>
    );
};

export default AddProductForm;
