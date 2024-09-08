import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './index.scss'
import useAuth from '../../customHooks/useAuth';

const AdminLayout = (props) => {
  const {children} = props;
  const {logout,canCreateAdmin} =useAuth();
  const navigate =useNavigate();

  const handleLogout = () =>{
    logout();
    navigate('/')
  }

  return (
    <div className='layout-admin'>
        <div className='admin-nav'>
            <ul className="admin-navbar-list">
                <Link to='/admin/Dashboard' className='navbar-list-item' ><li>Dashboard</li></Link>
                <Link to='/admin/products' className='navbar-list-item'><li>Products</li></Link>
                <Link to='/admin/tables' className='navbar-list-item' ><li >Tables</li></Link>
                <Link to='/admin/tickets' className='navbar-list-item' ><li>Tickets</li></Link>
                <Link to='/admin/orders' className='navbar-list-item' ><li>Orders</li></Link>
                {canCreateAdmin && <Link to='/admin/administration' className='navbar-list-item' ><li>Administration</li></Link>}
            </ul>
            <div>
                <p className='logout-admin' onClick={()=>{handleLogout()}}>Logout</p>
            </div>
        </div>
        <div className='admin-body'>
        {children}
        </div>
    </div>
  )
}

export default AdminLayout