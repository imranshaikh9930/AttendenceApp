import { Typography, Divider } from "@mui/material";
import profileImg from "../assets/avatar.webp";
import React from "react";

const Profile = () => {
  const skills = [
    "React",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Git",
  ];
  

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#222F7D] rounded-lg">
        <Typography className="text-white py-3 text-2xl text-center font-semibold">
          Profile
        </Typography>
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl bg-white mx-auto mt-6 rounded-xl shadow-md p-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={profileImg}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-[#222F7D] object-cover"
            />
          </div>

          {/* Employee Info */}
          <div className="md:col-span-2 space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              John Doe
            </h2>
            <p className="text-gray-600">
              Employee ID: <span className="font-medium">EMP1023</span>
            </p>
            <p className="text-gray-600">
              Role: <span className="font-medium">Frontend Developer</span>
            </p>
            <p className="text-gray-600">
              Status: <span className="text-green-600 font-semibold">Active</span>
            </p>
          </div>
        </div>

        <Divider className="my-6" />

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 px-2C">

          {/* Personal Details */}
          <div className="bg-gray-50 p-4 rounded-lg ">
            <h3 className="text-lg font-semibold text-[#222F7D] mb-3">
              Personal Details
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Full Name:</strong> John Doe</li>
              <li><strong>Gender:</strong> Male</li>
              <li><strong>DOB:</strong> 12 Jan 1997</li>
              <li><strong>Blood Group:</strong> O <sup>+</sup></li>
              <li><strong>Maritalstatus:</strong> Single</li>
              <li><strong>Nationality:</strong> Indian</li>
            </ul>
          </div>
          {/* Company Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#222F7D] mb-3">
              Company Details
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Department:</strong> Engineering</li>
              <li><strong>Joining Date:</strong> 01 Feb 2023</li>
              <li><strong>Manager:</strong> Rahul Sharma</li>
              <li><strong>Work Type:</strong> Full Time</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 rounded-xl shadow-sm border p-5">
            <h3 className="text-lg font-semibold text-[#222F7D] mb-4">
              Contact Details
            </h3>

            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>Email:</strong> johnDoe@gmail.com</li>
              <li><strong>Phone:</strong> +12345679</li>
              <li><strong>Emergency Contact:</strong> +654932618</li>
              <li><strong>Address:</strong>Bandra West, Mumbai, Maharashtra</li>
            </ul>
          </div>




          {/* Skills  */}
          {/* Skills / Tech Stack */}
          <div className="bg-gray-50 rounded-xl shadow-sm border p-5 mt-3  ">
            <h3 className="text-lg font-semibold text-[#222F7D] mb-4 ">
              Skills / Tech Stack
            </h3>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 text-sm font-medium rounded-full 
                   bg-blue-100 text-[#222F7D]
                   hover:bg-[#222F7D] hover:text-white
                   transition-all duration-200 cursor-default hover:cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Profile;
