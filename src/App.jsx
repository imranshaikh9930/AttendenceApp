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
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      

      <Router>
  <Routes>

    {/* ADMIN DASHBOARD */}
    <Route path="/admin" element={<Adminlayout />}>
      <Route index element={<Overview />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="attendance" element={<Attendence />} />
      <Route path="settings" element={<Settings />} />
      <Route path="help" element={<Help />} />
    </Route>

    {/* EMPLOYEE DASHBOARD */}
    <Route path="/employee" element={<Employlayout />}>
      <Route index element={<Overview />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="attendance" element={<Attendence />} />
      <Route path="help" element={<Help />} />
    </Route>

  </Routes>
</Router>

        
    </>
  )
}

export default App
