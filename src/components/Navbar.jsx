import React,{useEffect, useState} from 'react'
import {Menu} from "lucide-react";
import { Avatar, Button} from "@mui/material";
import avatarImg from "../assets/avatar.webp";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [open,setOpen] = useState(false);
  // const { open, setOpen } = useContext(SidebarContext);
  const navigate = useNavigate();


  
  const handleSwitch = () => {
    const newRole =
      localStorage.getItem("role") === "admin" ? "employee" : "admin";
  
    localStorage.setItem("role", newRole);
    // window.dispatchEvent(new Event("storage"));
    navigate(newRole === "admin" ? "/employee":"/admin")
  };
 
  
  return (
    <div>
         <header className="bg-white shadow p-4 flex items-center justify-between gap-5">
      {/* Toggle button for both desktop + mobile */}
      <div>

        <button
          // onClick={() => setOpen(!open)}
          className="text-gray-700 p-2 rounded hover:bg-gray-200/60"
        >
          <Menu size={26} />
        </button>
      </div>
      <div className="flex-2">

        {/* Title Name */}
        <h1 className="ml-4 text-2xl font-semibold w-full text-center">Attendance</h1>
      </div>
      <div className="">

        <div className=" flex items-center gap-4 mr-4">

          {/* Current Date & Time */}
     

          {/* userProfile */}
          <Avatar alt="Avatar" src={avatarImg} />
         {/* Dropdown */}
          {/* <Dropdown/> */} 
      <Button variant="contained" onClick={handleSwitch}>Switch Role</Button>
        </div>
      </div>


    </header>

    </div>
  )
}

export default Navbar