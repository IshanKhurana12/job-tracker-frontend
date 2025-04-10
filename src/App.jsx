import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserContext, { UserProvider } from './context/userContextProvider'
import Login from './Login'
import { useNavigate } from 'react-router-dom'

function App() {
 const[data,setdata]=useState([]);
 const {user,setuser}=useContext(UserContext);
const [filter,setfilter]=useState("");
const [filterdata,setfilterdata]=useState([]);
const url="https:job-tracker-backend-production-77a3.up.railway.app/application"
const navigate=useNavigate();

const [status,setstatus]=useState('');
useEffect(()=>{
  const fetchData=async()=>{
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if(!response.ok){
        throw new Error("Failed to fetch data");
      }
      const result=await response.json();
      setdata(result);
      setfilterdata(result);
    } catch (error) {
      console.log("first add data", error);
    }
  }
  fetchData();

  
},[user]);


async function handledelete(id){
  const url = `https://job-tracker-backend-production-77a3.up.railway.app/application/delete/${id}`;
 const result=await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })

setdata((prevData) => prevData.filter((item) => item._id !== id));
  if(!result.ok){
    console.log("Error deleting data");
  }
  
}

function handleupdate(id){
    navigate(`/update/${id}`);
}

function handlefilter(e){
  const selectedFilter = e.target.value;
  setfilter(selectedFilter);
  if (selectedFilter === "All") {
    setfilterdata(data);}
  else {
  const filteredData = data.filter(item => item.status === selectedFilter);
  setfilterdata(filteredData);
  }
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-start m-5 bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="w-full mb-4">
        <select
          id="status"
          name="status"
          value={filter}
          onChange={handlefilter}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All">All Data</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      {filterdata.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {filterdata.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                {item.jobTitle}
              </h2>
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Company:</span> {item.company}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Role:</span> {item.role}
              </p>
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Status:</span> {item.status}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => handleupdate(item._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => handledelete(item._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-xl font-bold text-blue-700 text-center">
            No Data Found
          </h1>
        </div>
      )}
    </div>
  );
}
export default App;