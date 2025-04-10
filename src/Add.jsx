import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './context/userContextProvider';


const Add = () => {
    const {user,setuser}=useContext(UserContext);
    console.log(user);
    const navigate=useNavigate();
    const url = "https://job-tracker-backend-production-77a3.up.railway.app/application/add";
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('Applied');
    const [link, setLink] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'company':
                setCompany(value);
                break;
            case 'role':
                setRole(value);
                break;
            case 'status':
                setStatus(value);
                break;
            case 'link':
                setLink(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        
        try {
            const result =await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ company, role, status, link }),
              });
            console.log(result);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Job</h2>

                <div className="mb-4">
                    <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Company
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={company}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter company name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Role
                    </label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={role}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter role"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="link"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Link
                    </label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={link}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter job link"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
        </div>
    )

};

export default Add;
