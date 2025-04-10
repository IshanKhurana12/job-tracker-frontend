import React, { useContext, useState } from 'react'
import UserContext from './context/userContextProvider'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const url="https:job-tracker-backend-production-77a3.up.railway.app/login"
    const {user,setuser}=useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const handleLogin =async (event) => {
        event.preventDefault();
        const data = {
            email,
            password
        };
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Login failed");
            }
            const result = await response.json();
            setuser(result);
           
           if(result.token.length>0){
            navigate("/");
           }
           
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email:
                </label>
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Password:
                </label>
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Login
            </button>
        </form>
    </div>
)
}

export default Login
