import { Typography } from '@mui/material'
import React from 'react'
import Table from '../components/Table';
import Filters from '../components/Filters';

const Attendence = () => {

  const role = localStorage.getItem("role");
     const dummyAttendenceData = [
        {
          id: 1,
          EmpId:23005,
          name: "Rahul Sharma",
          department: "Engineering",
          date: "10-03-2025",
          checkIn: "09:05 AM",
          checkOut: "06:10 PM",
          status: "Present",
          workingHours:8,
          expectedWHR:9.5
        },
        {
          id: 2,
          EmpId:23005,
          name: "Priya Verma",
          department: "HR",
          date: "10-03-2025",
          checkIn: "09:30 AM",
          checkOut: "06:00 PM",
          status: "Late",
          workingHours:7,
          expectedWHR:9.5
        },
        {
          id: 3,
          EmpId:23005,
          name: "Amit Singh",
          department: "Finance",
          date: "10-03-2025",
          checkIn: "--",
          checkOut: "--",
          status: "Absent",
          workingHours:0,
          expectedWHR:9.5
        },
        {
          id: 4,
          EmpId:23005,
          name: "Neha Gupta",
          department: "Engineering",
          date: "10-03-2025",
          checkIn: "08:55 AM",
          checkOut: "05:45 PM",
          status: "Present",
          workingHours:9,
          expectedWHR:9.5
        },
        {
          id: 5,
          EmpId:23005,
          name: "Rohit Kumar",
          department: "Sales",
          date: "10-03-2025",
          checkIn: "09:20 AM",
          checkOut: "06:15 PM",
          status: "Late",
          workingHours:7,
          expectedWHR:9.5
        },
        {
          id: 6,
          EmpId:23005,
          name: "Sneha Patel",
          department: "Marketing",
          date: "10-03-2025",
          checkIn: "09:00 AM",
          checkOut: "06:00 PM",
          status: "Present",
          workingHours:8,
          expectedWHR:9.5
        },
        {
          id: 7,
          EmpId:23005,
          name: "Arjun Mehta",
          department: "Engineering",
          date: "10-03-2025",
          checkIn: "--",
          checkOut: "--",
          status: "Absent",
          workingHours:0,
          expectedWHR:9.5
        },
        {
          id: 8,
          EmpId:23005,
          name: "Kavita Joshi",
          department: "Support",
          date: "10-03-2025",
          checkIn: "09:10 AM",
          checkOut: "06:05 PM",
          status: "Present",
          workingHours:8,
          expectedWHR:9.5
        },
        {
          id: 9,
          EmpId:23005,
          name: "Vikas Yadav",
          department: "Operations",
          date: "10-03-2025",
          checkIn: "09:40 AM",
          checkOut: "06:20 PM",
          status: "Late",
          workingHours:9,
          expectedWHR:9.5
        },
        {
          id: 10,
          EmpId:23005,
          name: "Pooja Malhotra",
          department: "HR",
          date: "10-03-2025",
          checkIn: "09:00 AM",
          checkOut: "06:00 PM",
          status: "Present",
          workingHours:8,
          expectedWHR:9.5
        }
      ];
      
      
    const tableHeader = [
        "Sr.No","EmpId","Employee Name","Date","Check In","Check Out","Status",
        "Expected Hours","Actual Working Hours",
    ]


    const singleEmpHeader = [
      "EmpId","Emp.Name","Date","Status","Current WHR","Expected Hours"
    ]
    const singleEmp = [
      {
        empId:23005,
        empName:"John",
        // department:"IT",
        date:"20-12-2025",
        status:"Present",
        currentHR:8.5,
        expectedHr:9
      }
    ]
    
  return (
    <div className="px-3 pb-6">

    {/* Sticky Header */}
    <div className="sticky top-0 z-50 bg-[#222F7D] rounded-lg">
      <Typography className="text-white py-2 text-2xl text-center">
       Attendence
      </Typography>
      
    </div>
    
      {/* Filter Component */}
  <div className='sticky top-0 z-50 w-full bg-[#4f565b] mt-1 rounded-lg'>

<Filters/>
</div>
    {
      role != "admin" && 
    <Table dummyAttendenceData= {dummyAttendenceData} tableHeaderData={tableHeader}/>
    }
    {
      role == "admin" && 
    <Table dummyAttendenceData= {singleEmp} tableHeaderData={singleEmpHeader}/>
    }
    


   
  
  </div>
  )
}

export default Attendence