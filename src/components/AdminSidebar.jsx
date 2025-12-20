import React, { useState, useContext } from "react";
import { NavLink,Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import Logo from "../assets/logo.jpg"


import {
  Book,
  Captions,
  User,
  X,
  Inbox,
  ArchiveRestore,
  GraduationCap,
  BookAIcon,
  House,
  LockKeyhole
} from "lucide-react";



import { useLocation } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContextProvider";
// import SidebarDropdown from "./SidebarDropdown";

const Sidebar = () => {
  //   const { open, setOpen } = useContext(SidebarContext);
  const [open, setOpen] = useState(!false);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isActive, setIsActive] = useState(false);

  // Active route helper
  // const isActive = (path) => location.pathname === path;

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded transition border
     ${
       isActive
         ? "bg-[#222F7D] text-white"
         : "text-black hover:bg-[#222F7D] hover:text-white border-[#dbdbdb]"
     }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {/* {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setOpen(false)}
        ></div>
      )} */}

      {/* Desktop Sidebar */}
      <aside
        className={`
            text-black
        
          
           shadow-md h-screen sticky top-0 
          transition-all duration-300  lg:flex flex-col z-50
           ${open ? "w-64" : "w-20"}
          `}
      >
        {/* Header */}
        {open ? (
          <button
            onClick={() => setOpen(!open)}
            className="p-4 text-black self-center text-xl tracking-wide font-semibold shadow-lg bg-opacity-15 "
            
          >
           Admin  Attendence
          </button>
          
        ) : (
          <div className="w-full flex items-center justify-center h-[50px]">
            <BookAIcon className="text-black" />
          </div>
        )}

        {/* Menu Items */}
        <nav className="mt-6 space-y-2 flex-1 px-4">

          {/* Home */}
          <NavLink
            to="/admin"
            className={navClass}
            end
            
          >
            <House />
            {open && <span>Overview</span>}
          </NavLink>

          <NavLink
            to="/admin/change-password"
            className={navClass}
          //   ${isActive("/") ? "bg-white text-[#1e9afe]" : "text-white hover:bg-blue-200"}
          >
            <LockKeyhole />
            {open && <span>Change Password</span>}
          </NavLink>

          <NavLink
            to="/admin/attendance"
            
            className={navClass}
          //   ${isActive("/") ? "bg-white text-[#1e9afe]" : "text-white hover:bg-blue-200"}
          >
            <LockKeyhole />
            {open && <span>Attendence</span>}
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={navClass}
          //   ${isActive("/") ? "bg-white text-[#1e9afe]" : "text-white hover:bg-blue-200"}
          >
            <IoMdSettings  size={20}/>
            {open && <span>Settings</span>}
          </NavLink>


          <NavLink
            to="/admin/help"
            className={navClass}
          //   ${isActive("/") ? "bg-white text-[#1e9afe]" : "text-white hover:bg-blue-200"}
          >
            <IoIosHelpCircle className="hover:transition duration-300 rotate-180" />
            {open && <span>Help</span>}
          </NavLink>

          {/* Books Dropdown */}
          {/* <SidebarDropdown
            icon={Book}
            label="Books"
            openSidebar={open}
            activeBasePath="/books"
            items={[
              { label: "Book List", path: "/books" },
              { label: "Add Book", path: "/books/add" },
              { label: "Categories", path: "/books/categories" }
            ]}
          /> */}

          {/* Authors Dropdown */}
          {/* <SidebarDropdown
            icon={GraduationCap}
            label="Author"
            openSidebar={open}
            activeBasePath="/author"
            items={[
              { label: "Author List", path: "/author/list" },
              { label: "Add Author", path: "/author/add" }
            ]}
          /> */}

          {/* Subjects Dropdown */}
          {/* <SidebarDropdown
            icon={Captions}
            label="Subjects"
            openSidebar={open}
            activeBasePath="/subjects"
            items={[
              { label: "Subject List", path: "/subjects/list" },
              { label: "Add Subject", path: "/subjects/add" }
            ]}
          /> */}

          {/* Publisher Dropdown */}
          {/* <SidebarDropdown
            icon={Book}
            label="Publisher"
            openSidebar={open}
            activeBasePath="/publisher"
            items={[
              { label: "Publisher List", path: "/publisher/list" },
              { label: "Add Publisher", path: "/publisher/add" }
            ]}
          /> */}

          {/* User Dropdown */}
          {/* <SidebarDropdown
            icon={User}
            label="User"
            openSidebar={open}
            activeBasePath="/user"
            items={[
              { label: "User List", path: "/user/list" },
              { label: "Add User", path: "/user/add" }
            ]}
          /> */}


        </nav>
      </aside>





    </>
  );
};

export default Sidebar;

{/* Mobile Sidebar */ }
{/* <div className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? "block" : "hidden"}`}>
<div
  className="fixed inset-0 bg-black/50"
  onClick={() => setMobileOpen(false)}
/>
<aside
  className="fixed left-0 top-0 h-full w-64 bg-dark-500shadow-md flex flex-col z-50 overflow-y-auto"
>
  {/* Close Button */}
// <button
//   onClick={() => setMobileOpen(false)}
//   className="p-4 text-white text-xl font-semibold self-end"
// >
//   X
// </button>

{/* Mobile Menu Items (Same as Desktop) */ }
// <nav className="mt-6 space-y-2 px-4">
//   <Link
//     to="/"
//     onClick={() => setMobileOpen(false)}
//     className={`flex items-center gap-3 px-4 py-2 rounded transition ${
//       isActive("/") ? "bg-white text-[#1e9afe]" : "text-white hover:bg-blue-200"
//     }`}
//   >
//     <House />
//     <span>Home</span>
//   </Link>

{/* You can repeat SidebarDropdowns here for mobile */ }
{/* <SidebarDropdown
      icon={Book}
      label="Books"
      openSidebar={true} // always open on mobile
      activeBasePath="/books"
      items={[
        { label: "Book List", path: "/books" },
        { label: "Add Book", path: "/books/add" },
        { label: "Categories", path: "/books/categories" },
      ]}
    /> */}

//     {/* Repeat other dropdowns for Authors, Subjects, etc. */}
//   </nav>
// </aside>
// </div> */}

// {/* Mobile toggle button (e.g., in Navbar) */}
// <button
// className="lg:hidden fixed top-4 left-4 z-10 p-2 rounded  text-white"
// onClick={() => setMobileOpen(true)}
// >
// X
// </button>