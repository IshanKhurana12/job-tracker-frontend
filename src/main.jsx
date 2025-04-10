
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContextProvider.jsx'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Navbar from './Navbar.jsx'
import Add from './Add.jsx'
import Logout from './Logout.jsx'
import Update from './Update.jsx'
import UserChecker from './UserChecker.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserChecker> <App /> </UserChecker>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<UserChecker> <Add /> </UserChecker>} />
          <Route path="/update/:id" element={<UserChecker> <Update /> </UserChecker>} />
        </Routes>
      </UserProvider>
    </Router>
  </>
)
