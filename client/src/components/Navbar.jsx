import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Avatar, Button } from "@mui/material";
import avatarImg from "../assets/avatar.webp";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setDate(formattedDate);
  }, []);

  const handleLogout = () => {
    // const newRole =
    //   localStorage.getItem("role") === "admin" ? "employee" : "admin";

    // localStorage.setItem("role", newRole);
    // navigate(newRole === "admin" ? "/employee" : "/admin");

    localStorage.removeItem("user");
    navigate("/")
  };

  const handleSidbarExpand = ()=>{
    
  }
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">

      {/* LEFT: Menu */}
      <button className="p-2 rounded hover:bg-gray-200/60">
        <Menu size={26} onClick={handleSidbarExpand} />
      </button>

      {/* CENTER: Title */}
      <h1 className="text-lg md:text-2xl font-semibold text-center flex-1">
        Attendance
      </h1>

      {/* RIGHT: User Actions */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* Date (hidden on mobile) */}
        <span className="hidden md:block text-sm text-gray-500">
          {date}
        </span>

        {/* Avatar */}
        <Avatar alt="Avatar" src={avatarImg} />
        <div className="md:col-span-3">
          <h2 className="text-md font-semibold">{user?.name}</h2>
          {/* <p className="text-gray-600">{orgData.designation}</p> */}

        
        </div>

        {/* <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        <img
          src={avatarImg}
          alt="profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-[#222F7D] object-cover"
        />

      
      </div>

      {/* <Divider className="my-4" /> */}
      <div className="flex-grow" />
    {/* </div> */}

        {/* Switch Role Button */}
        <Button
          variant="contained"
          size="small"
          onClick={handleLogout}
          className="hidden sm:inline-flex"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
