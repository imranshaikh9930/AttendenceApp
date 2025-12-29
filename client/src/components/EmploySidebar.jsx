import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";

import { House, LockKeyhole, BookAIcon } from "lucide-react";

const EmploySidebar = () => {
  const [open, setOpen] = useState(true);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded transition border
     ${isActive
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
        className="p-4 text-black self-center text-xl tracking-wide font-semibold shadow-lg bg-opacity-15"
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
          {open && <span>My Attendance</span>}
        </NavLink>




        <NavLink to="/employee/profile" className={navClass}>
          <CgProfile size={20} />
          {open && <span>My Profile</span>}
        </NavLink>

        <NavLink to="/employee/holidays" className={navClass}>
          <MdOutlineHolidayVillage size={20} />
          {open && <span>Holidays</span>}
        </NavLink>

        <NavLink to="/employee/leaves" className={navClass}>
          <SlCalender size={20} />
          {open && <span>My Leaves</span>}
        </NavLink>

        <NavLink to="/employee/settings" className={navClass}>
          <IoMdSettings size={20} />
          {open && <span>Settings</span>}
        </NavLink>

      </nav>
    </aside>
  );
};

export default EmploySidebar;
