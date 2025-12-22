import { useState } from 'react'
import {BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import Adminlayout from "./layout/Adminlayout";
import Employlayout from './layout/EmployLayout';
import './App.css'
import Overview from "./pages/Overview";
import ChangePassword from './pages/ChangePassword';
import Attendence from "./pages/Attendence";
import Settings from './pages/Settings';
import Help from './pages/Help';
import Login from './components/Login';
import Holidays from './pages/Holidays';
import Profile from './pages/Profile';
import Employelist from './components/Employelist';
import Leaves from './pages/Leaves';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      

      <Router>
  <Routes>

    <Route path="/" element={<Login/>}/>
    {/* ADMIN DASHBOARD */}
    <Route path="/admin" element={<Adminlayout />}>
      <Route index element={<Overview />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="attendance" element={<Attendence />} />
      <Route path="settings" element={<Settings />} />
      <Route path="help" element={<Help />} />
      <Route path="employees" element={<Employelist/>}/>
    </Route>

    {/* EMPLOYEE DASHBOARD */}
    <Route path="/employee" element={<Employlayout />}>
      <Route index element={<Overview />} />
      <Route path="settings" element={<Settings />} />
      <Route path="attendance" element={<Attendence />} />
      <Route path="holidays" element={<Holidays />} />
      <Route path="profile" element={<Profile />} />
      <Route path="leaves" element={<Leaves />} />
    </Route>

  </Routes>
</Router>

        
    </>
  )
}

export default App
