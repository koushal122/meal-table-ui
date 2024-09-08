import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from './customHooks/useAuth';

const AdminPrivateRoute = ({ children }) => {
    const { isUserAdmin ,isAuthenticated} = useAuth();
    return isUserAdmin ? children : (isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />);
};

export default AdminPrivateRoute;