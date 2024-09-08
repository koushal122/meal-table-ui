import React, { useState } from 'react'
import './index.scss'
import Header from '../../Components/navbar'
import { Link, useNavigate } from 'react-router-dom'
import genericInterface from '../../Util/genericInterface'
import * as constants from './constants.js'
import { emailValidator,passwordValidator } from '../../helper/validations/validations'
import AppLayout from '../../layout/appLayout/index.js'

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const signupApi = genericInterface(constants.SIGNUP_ENDPOINT);

  const handleSignup = async () => {
    if (!emailValidator(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    if (!passwordValidator(password)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    const payload = { userName:name, userEmail:email, password:password };

    try {
      const response = await signupApi.create(payload);
      if (response.status === 200) {
        alert('User created successfully, please login')
        navigate('/login');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <AppLayout showFooter={false}>
     <div className='signup-page'>
        <div className='signup-quote'>
            <p>Welcome to our family</p>
            <p>Excited to see you.</p>
        </div>
        <div className='signup-form'>
            <input
                placeholder='Enter your name'
                type='text'
                className='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                placeholder='Enter your email address'
                type='email'
                className='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                placeholder='Enter your password'
                type='password'
                className='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessage && <p className='error-message'>{errorMessage}</p>}
              <button type='button' className='login' onClick={handleSignup}>
                Register
              </button>
              <Link to='/login'>Already have an account? Login here.</Link>
        </div>
     </div>
    </AppLayout>
  )
}

export default Signup