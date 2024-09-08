import React, { useEffect, useState } from 'react'
import genericInterface from '../../../Util/genericInterface';
import * as constants from './constants.js'
import CustomModal from '../../../Components/commonModel/index.js';
import CustomTable from '../../../Components/customTable/index.js';
import AddTableForm from './components/addTable/index.js';
import './index.scss'
import AdminLayout from '../../../layout/adminLayout/index.js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../customHooks/useAuth.js';

const Table = () => {
    const allTablesApi = genericInterface(constants.GET_ALL_TABLE_ENDPOINT);
    const deletTableApi = genericInterface(constants.DELETE_TABLE_ENDPOINT);
    const [tables,setTables] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tableHeaders = ["Table id","Number of seats","Seats Id"];
    const navigate=useNavigate();
    const {logout} = useAuth();

    async function fetchTables(){
        try {
            const response = await allTablesApi.read();
            setTables(await convertToTable(response.data));
        } catch (error) {
            if(error.response.status===401){
                logout();
                navigate('/login')
            }
            else alert(error.message);
        }
    }

    useEffect(()=>{
        fetchTables();
    },[])

    const handleSave = () => {
        fetchTables();
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const convertToTable = async(tableResponse) =>{
        let data = [];
        tableResponse.forEach(element => {
            let row = [];
            row.push(element.id);
            row.push(element.capacity);
            let seatsId = "";
            element.seats.forEach((seat) =>{
                seatsId+=(seat.id+", ");
            });
            row.push(seatsId);
            data.push(row);
        });
        return data;
    }

    const deleteTable = async(id) =>{
        try {
            const response = await deletTableApi.create({},{tableId:id});
            if(response.status===200) alert('Table deleted successfully');
            fetchTables();
        } catch (error) {
            console.log(error);
            if(error.response.status===401) navigate('/login');
            alert('something went wrong');
        }
    }

  return (
    <AdminLayout>
    <div className='tables'>
        <p className='header'>Your Tables</p>
        <button onClick={handleOpenModal} className='add-product'>Add new table</button>
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} title="Add new table">
            <AddTableForm onSave={handleSave} />
        </CustomModal>
        <CustomTable headers={tableHeaders} data={tables}  onDelete={deleteTable}/>
    </div>
    </AdminLayout>
  )
}

export default Table