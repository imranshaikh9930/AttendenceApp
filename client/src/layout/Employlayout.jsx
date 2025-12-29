import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EmploySidebar from '../components/EmploySidebar'

const Employlayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-white">
    {/* Sidebar */}
    <EmploySidebar open={sidebarOpen} setOpen={setSidebarOpen} />
  
    {/* Main Content Wrapper */}
    <div className="flex flex-1 flex-col min-w-0 ">
      
      {/* Navbar */}
      <Navbar setOpen={setSidebarOpen} open={sidebarOpen} />
  
      {/* Page Content (Outlet) */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden py-2 ">
        <Outlet />
      </main>

      {/* <footer>IDilligence Solution</footer> */}
  
    </div>
  </div>
  )
}

export default Employlayout