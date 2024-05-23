import React,{useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode";
const ProtectedRoute = ({Component}) => {

    function isTokenExpired(token) {
      const decoded = jwtDecode(token);
      const expiry = decoded.exp;
      return (Date.now() >= expiry * 1000);
  }
  
  function checkAndRemoveToken() {
      const token = Cookies.get('token');
  
      if (token && isTokenExpired(token)) {
          Cookies.remove('token');
          Cookies.remove('userId');
          Cookies.remove('userName');
          return
      }
      return token
  }
  const isLoggedIn=checkAndRemoveToken();
  return (
    <div>
      {isLoggedIn?<Component/>:<Navigate to='/' />}
    </div>
  )
}

export default ProtectedRoute