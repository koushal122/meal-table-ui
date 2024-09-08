import React, { useState } from 'react'
import './index.scss'
import Header from '../../Components/navbar'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_ENDPOINT } from './constants'
import genericInterface from '../../Util/genericInterface'
import { setJwtToken } from '../../Util/jwtUtil'
import { useDispatch } from 'react-redux'
import { toggleUserAuthentication } from '../../helper/Slices/authSlice'
import useAuth from '../../customHooks/useAuth'
import { emailValidator } from '../../helper/validations/validations'
import AppLayout from '../../layout/appLayout'


const Login = () => {
  const [email,setUserEmail]=useState('');
  const [password,setPassword]=useState('');
  const loginAPI = genericInterface(LOGIN_ENDPOINT);
  const navigate =useNavigate();
  const {login} =useAuth();


  const handleLoginSubmit =async (email,password)=>{
    if(!emailValidator(email)){
      alert('please enter valid email adress');
      return;
    }
    const payload ={
        "userEmail":email,
        "password":password,
    }
   try{
      const response=await loginAPI.create(payload);
      if(response.status===200){
         login(response.data.jwtToken,response.data.userEmail,response.data.userName,response.data.role==='ADMIN',response.data.canCreateAdmin);
         if(response.data.role==='ADMIN') navigate('/admin/dashboard');
         else navigate('/');
      }
   }catch(err){
     console.log(err);
     alert(err.response.data);
   }
}


  return (
    <AppLayout showFooter={false}>
     <div className='login-page'>
        <div className='login-quote'>
            <p>Welcome Back!</p>
            <p>Excited to see you again.</p>
        </div>
        <div className='login-form'>
            <input placeholder='Enter you email address' type='email' className='email' onChange={(e)=>setUserEmail(e.target.value)}></input>
            <input placeholder='Enter your password' type='password' className='password' onChange={(e)=>setPassword(e.target.value)}></input>
            <button type='submit' className='login' onClick={()=>handleLoginSubmit(email,password)}>Login</button>
            <Link><p>Forgot password ? click here.</p></Link>
            <Link to='/signup'>New to our family ? Register here.</Link>
        </div>
     </div>
    </AppLayout>
  )
}

export default Login