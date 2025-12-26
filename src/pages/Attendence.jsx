import { Typography } from "@mui/material";
import React from "react";
import Table from "../components/Table";
import Filters from "../components/Filters";

const Attendence = () => {
  const role = localStorage.getItem("role") || "employee";

  // Admin 
  const adminTableHeader = [
    "Sr.No",
    "EmpId",
    "Employee Name",
    "Date",
    "Check In",
    "Check Out",
    "Status",
    "Expected Hours",
    "Actual Working Hours",
  ];
  const allAttendanceData = [
    {
      id: 1,
      EmpId: 23005,
      name: "Rahul Sharma",
      department: "Engineering",
      date: "10-03-2025",
      checkIn: "09:05 AM",
      checkOut: "06:10 PM",
      status: "Present",
      workingHours: 8,
      expectedWHR: 9.5,
    },
    {
      id: 2,
      EmpId: 23006,
      name: "Priya Verma",
      department: "HR",
      date: "10-03-2025",
      checkIn: "09:30 AM",
      checkOut: "06:00 PM",
      status: "Late",
      workingHours: 7,
      expectedWHR: 9.5,
    },
    {
      id: 3,
      EmpId: 23007,
      name: "Amit Singh",
      department: "Finance",
      date: "10-03-2025",
      checkIn: "--",
      checkOut: "--",
      status: "Absent",
      workingHours: 0,
      expectedWHR: 9.5,
    },
  ];
 
  // Emp Data
  const employeeTableHeader = [
    "EmpId",
    "Emp.Name",
    "Date",
    "Status",
    "Current WHR",
    "Expected Hours",
  ];
  const singleEmployeeData = [
    {
      empId: 23005,
      empName: "John",
      date: "20-12-2025",
      status: "Present",
      currentHR: 8.5,
      expectedHr: 9,
    },
  ];

  

  

  return (
    <div className="px-3 pb-6">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#222F7D] rounded-lg">
        <Typography className="text-white py-2 text-2xl text-center">
          Attendance
        </Typography>
      </div>

      {/* Filters */}
      {
        role === "admin" && 
      <div className="sticky top-[56px] z-40 w-full bg-[#4f565b] mt-1 rounded-lg">
        <Filters />
      </div>
      }

      {/* Table */}
      <div className="mt-4">
        <Table
          role={role}
          data={role === "admin" ? allAttendanceData : singleEmployeeData}
          headers={role === "admin" ? adminTableHeader : employeeTableHeader}
        />
      </div>

    </div>
  );
};

export default Attendence;
