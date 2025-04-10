import React, { useContext, useEffect } from 'react'
import UserContext from './context/userContextProvider';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {user,setuser}=useContext(UserContext);
   const navigate= useNavigate();
   useEffect(()=>{
    const handleLogout = () => {
        setuser({}); 
        navigate('/login'); 
    };
    handleLogout();
   },[]) 
  return (
    <div>
      
    </div>
  )
}

export default Logout
