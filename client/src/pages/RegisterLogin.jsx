import React, { useEffect, useState } from 'react'
import LoginPage from '../components/login';
import RegisterPage from '../components/signup';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const userFromLocal = JSON.parse(window.localStorage.getItem('usertoken'));

      if(userFromLocal) {
        try {
          console.log(userFromLocal);
  
          if (userFromLocal && userFromLocal.token) {
            const res = await axios.post('http://localhost:3000/api/auth/verify-token', {
              token: userFromLocal.token,
              user: userFromLocal.user
            });
  
            console.log('Token verified:', res.data);
  
            if (res.data?.isAuthenticated) {
              navigate('/dashboard');
            } else {
              window.localStorage.removeItem("usertoken");
            }
          } else {
            console.log('No valid token found');
          }
        } catch (err) {
          console.error('Token verification error:', err);
        }
      }
    };

    verifyToken();
  }, [navigate]);

  console.log("risgter")
  return (
    <>
    {!isLogin ? 
      <RegisterPage setIsLogin={setIsLogin}/>
      :
      <LoginPage setIsLogin={setIsLogin}/>
    }
    </>
  )
}

export default RegisterLogin