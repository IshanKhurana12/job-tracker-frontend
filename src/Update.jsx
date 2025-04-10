import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from './context/userContextProvider';

const Update = () => {
    const {id}=useParams();
    const [status, setStatus] =useState('change to update');
    const [link, setLink] =useState('plz add a valid link');
    const {user,setuser}=useContext(UserContext);
    
    const navigate=useNavigate();
   const handleclick=async(e)=>{
        e.preventDefault();
        const url = `https://job-tracker-backend-production-77a3.up.railway.app/application/update/${id}`;
        try {
            const result =await fetch(url, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "authorization": `Bearer ${user.token}`,
                },
                body: JSON.stringify({ status, link }),
              });
                console.log(result);
                navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Update Status</h2>
            <label htmlFor="status" className="block text-sm font-medium text-gray-600 mb-2">
                Change Status
            </label>
            <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
            </select>
            <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
                type="link"
                placeholder="Enter link"
                className="mt-4 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button onClick={handleclick}
                className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
                Submit
            </button>
        </div>
    </div>
)
}

export default Update
