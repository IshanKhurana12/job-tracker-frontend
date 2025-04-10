import React, { useContext, useEffect } from 'react'
import UserContext from './context/userContextProvider';
import { useNavigate } from 'react-router-dom';

const UserChecker = ({children}) => {
    const {user,setuser}=useContext(UserContext);
    const navigate= useNavigate();
   useEffect(()=>{  
    if(!user?.token){
        navigate('/login');
    }
},[]);
  return (
    <div>
      {children}
    </div>
  )
}

export default UserChecker
