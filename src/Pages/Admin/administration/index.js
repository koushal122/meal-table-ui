import React, { useEffect, useState } from 'react'
import './index.scss'
import AdminLayout from '../../../layout/adminLayout'
import CustomModal from '../../../Components/commonModel'
import AddAdminForm from './Components/addAdminForm'
import CustomTable from '../../../Components/customTable'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../customHooks/useAuth'
import * as constants from './constants.js'
import genericInterface from '../../../Util/genericInterface'

const Administration = () => {
    const fetchAllCreatedAdminsApi = genericInterface(constants.GET_ALL_CREATED_ADMINS_ENDPOINT);
    const createNewAdminApi = genericInterface(constants.CREATE_NEW_ADMIN_ENDPOINT);
    const tableHeaders = ["Admin Id","Admin Name", "Admin Email", "Can Create Admins"];
    const [tableData, setTable] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate=useNavigate();
    const {logout} = useAuth();

    const createAdmin = async(newAdminData) =>{
        try {
            const response = await createNewAdminApi.create(newAdminData,{});
            if(response.status===200){
                alert(`New Admin has been created successfully with Admin Id :- ${response?.data?.id}`);
                fetchAllCreatedAdmins();
                handleCloseModal();
            }else{
                alert(response?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const convertResponseToTableData = async(response) =>{
        const tempTableData = [];
        response.forEach(admin => {
            const row = [];
            row.push(admin?.id);
            row.push(admin?.userName);
            row.push(admin?.userEmail);
            admin?.canCreateAdmin ? row.push("Yes") : row.push("No");
            tempTableData.push(row);
        });
        setTable(tempTableData);
    }

    const fetchAllCreatedAdmins = async()=>{
        try {
            const response = await fetchAllCreatedAdminsApi.read();
            await convertResponseToTableData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const deleteAdmin = () =>{
        console.log("Delete Admin");
    }

    useEffect(()=>{
        fetchAllCreatedAdmins();
    },[]);

  return (
    <AdminLayout>
       <div className='tables'>
        <p className='header'>Created Admins</p>
        <button onClick={handleOpenModal} className='add-admin button'>Add new admin</button>
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} title="Add new admin">
            <AddAdminForm onSave={createAdmin} onClose={handleCloseModal}/>
        </CustomModal>
        <CustomTable headers={tableHeaders} data={tableData}  onDelete={deleteAdmin}/>
       </div>
    </AdminLayout>
  )
}

export default Administration