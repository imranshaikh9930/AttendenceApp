import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { House, LockKeyhole, BookAIcon } from "lucide-react";

const EmploySidebar = () => {
  const [open, setOpen] = useState(true);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded transition border
     ${
       isActive
         ? "bg-[#222F7D] text-white"
         : "text-black hover:bg-[#222F7D] hover:text-white border-[#dbdbdb]"
     }`;

  return (
    <aside
      className={`shadow-md h-screen sticky top-0 transition-all duration-300
        ${open ? "w-64" : "w-20"} flex flex-col`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="p-4 font-semibold text-center"
      >
        {open ? "Employee Attendance" : <BookAIcon />}
      </button>

      {/* Menu */}
      <nav className="mt-6 space-y-2 px-4 flex-1">

        <NavLink to="/employee" end className={navClass}>
          <House />
          {open && <span>Overview</span>}
        </NavLink>

        {/* <NavLink to="/employee/change-password" className={navClass}>
          <LockKeyhole />
          {open && <span>Change Password</span>}
        </NavLink> */}

        <NavLink to="/employee/attendance" className={navClass}>
          <LockKeyhole />
          {open && <span>Attendance</span>}
        </NavLink>

        <NavLink to="/employee/settings" className={navClass}>
          <IoMdSettings size={20} />
          {open && <span>Settings</span>}
        </NavLink>

        <NavLink to="/employee/help" className={navClass}>
          <IoIosHelpCircle size={20} />
          {open && <span>Help</span>}
        </NavLink>

      </nav>
    </aside>
  );
};

export default EmploySidebar;
