import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './Pages/home/home';
import Menu from './Pages/menu/menu';
import ServicesPage from './Pages/services';
import BlogPage from './Pages/blog';
import AboutPage from './Pages/about';
import Cart from './Pages/cart';
import Contact from './Pages/contact';
import Login from './Pages/login';
import { Signup } from './Pages/signup';
import Store from './store';
import {Provider} from 'react-redux'
import Products from './Pages/Admin/products';
import Dashboard from './Pages/Admin/dashboard';
import PrivateRoute from './PrivateRoute';
import Table from './Pages/Admin/tables';
import Tickets from './Pages/Admin/tickets';
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import Orders from './Pages/orders';
import Bookings from './Pages/bookings';
import AdminPrivateRoute from './AdminPrivateRoute';
import AdminOrder from './Pages/Admin/orders';
import Administration from './Pages/Admin/administration';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(Store);
root.render(
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/meal-table-ui'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* User Authenticated Routes */}
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <Bookings />
              </PrivateRoute>
            }
          />
          {/* Admin Authenticated Routes */}
          <Route
            path="/admin/products"
            element={
              <AdminPrivateRoute>
                <Products />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/tables"
            element={
              <AdminPrivateRoute>
                <Table />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminPrivateRoute>
                <Dashboard />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <AdminPrivateRoute>
                <Tickets />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminPrivateRoute>
                <AdminOrder />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/administration"
            element={
              <AdminPrivateRoute>
                <Administration />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);


  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
