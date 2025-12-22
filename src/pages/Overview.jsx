import { Typography } from "@mui/material";
import Cards from "../components/Cards";
import AttendanceBarChart from "../charts/AttendanceBarChart";
import AttendanceDoughnutChart from "../charts/Doughnut";
import { IoExitOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdOutlineCoPresent } from "react-icons/md";
import { BsFillPersonXFill } from "react-icons/bs";
import { TbClockX } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";


import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContextProvider";
import Leavecards from "../components/Leavecards";
import MonthlyHolidays from "../components/Monthlyholidays";


const Overview = () => {

  // const {role} = useContext(SidebarContext);
  const role = localStorage.getItem("role");

  console.log("Overview", role);
  const data = [
    { id: 1, title: "Total Employee", total: 15, icon: <IoPerson />, bgColor: "#222f7d" },
    { id: 2, title: "Present Today", total: 9, icon: <MdOutlineCoPresent />, bgColor: "#27F598" },
    { id: 3, title: "Absent Today", total: 6, icon: <BsFillPersonXFill />, bgColor: "#EB1010" },
    { id: 4, title: "Late Check-ins", total: 3, icon: <TbClockX />, bgColor: "#EB9310" },
    { id: 5, title: "On Leave", total: 2, icon: <FaUserClock />, bgColor: "#FACC15" }
  ];

  const empData = [
    {
      id: 1,
      title: "Punch In",
      value: "10:30 AM",
      description: "In Time",
      icon: <IoExitOutline />,
      bgColor: "#32a852"
    },
    {
      id: 2,
      title: "Punch Out",
      value: "6:30 PM",
      description: "Out Time",
      icon: <IoExitOutline />,
      bgColor: "#e60707"
    },
    {
      id: 3,
      title: "Total Hours",
      value: "8 Hours",
      description: "Monthly Hours",
      icon: <IoIosHome />,
      bgColor: "#e8970c"
    },
    // {
    //   id: 4,
    //   title: "Duration",
    //   value: "8 hr",
    //   description: "Today's Working",
    //   icon: <FaRegClock />,
    //   bgColor: "#4331cc"
    // }
  ];

  const leaveData = [
    { id: 1, title: "Total Leaves Taken", value: 5, icon: <SlCalender />, bgColor: "#32a852" },
    { id: 2, title: "Total Leaves Request", value: 2, icon: <SlCalender />, bgColor: "#e8970c" },
    { id: 3, title: "Total Leaves Allowed", value: 15, icon: <SlCalender />, bgColor: "#e60707" }
  ]

  const holidayList = [
    // 📌 Dec 2025
    { id: 1, name: "Christmas Day", date: "25 Dec 2025", month: "December" },

    // 📌 Jan 2026
    { id: 2, name: "New Year’s Day", date: "01 Jan 2026", month: "January" },
    { id: 3, name: "Makar Sankranti / Pongal", date: "14 Jan 2026", month: "January" },
    { id: 4, name: "Republic Day", date: "26 Jan 2026", month: "January" },

    // 📌 Feb 2026
    { id: 5, name: "Maha Shivaratri", date: "15 Feb 2026", month: "February" },

    // 📌 Mar 2026
    { id: 6, name: "Holi", date: "04 Mar 2026", month: "March" },
    { id: 7, name: "Id-ul-Fitr (Tentative)", date: "21 Mar 2026", month: "March" },
    { id: 8, name: "Ram Navami", date: "26 Mar 2026", month: "March" },
    { id: 9, name: "Mahavir Jayanti", date: "31 Mar 2026", month: "March" },

    // 📌 Apr 2026
    { id: 10, name: "Good Friday", date: "03 Apr 2026", month: "April" },

    // 📌 May 2026
    { id: 11, name: "Buddha Purnima", date: "01 May 2026", month: "May" },
    { id: 12, name: "Id-ul-Zuha (Bakrid) (Tentative)", date: "27 May 2026", month: "May" },

    // 📌 Jun 2026
    { id: 13, name: "Muharram (Tentative)", date: "26 Jun 2026", month: "June" },

    // 📌 Aug 2026
    { id: 14, name: "Independence Day", date: "15 Aug 2026", month: "August" },
    { id: 15, name: "Milad-un-Nabi / Id-e-Milad (Tentative)", date: "26 Aug 2026", month: "August" },

    // 📌 Sep 2026
    { id: 16, name: "Janmashtami", date: "04 Sep 2026", month: "September" },

    // 📌 Oct 2026
    { id: 17, name: "Mahatma Gandhi Jayanti", date: "02 Oct 2026", month: "October" },
    { id: 18, name: "Dussehra", date: "20 Oct 2026", month: "October" },

    // 📌 Nov 2026
    { id: 19, name: "Diwali (Deepavali)", date: "08 Nov 2026", month: "November" },
    { id: 20, name: "Guru Nanak Jayanti", date: "24 Nov 2026", month: "November" },

    // 📌 Dec 2026
    { id: 21, name: "Christmas Day", date: "25 Dec 2026", month: "December" },
  ];




  return (
    <div className="px-3 pb-6 bg-white">

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#222F7D] rounded-lg">
        <Typography className="text-white py-2 text-2xl text-center">
          Dashboard
        </Typography>
      </div>

      {/* Cards + Doughnut */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h1 className="mt-3 text-lg font-semibold" >Working time</h1>
          <Cards AdmincardData={data} EmploycardData={empData} />


          {
            role == "admin" && (
              <div className="mt-3 text-lg font-semibold">
                <h1 className="">Leave Section</h1>
                <Leavecards LeavecardData={leaveData} />
              </div>
            )
          }
        </div>

        {/* {role !== "admin" &&  */}
        <div className="bg-white rounded-xl shadow-xl p-0 flex flex-row h-[320px]">
          <h2 className="text-lg font-semibold mb-4 px-2 py-4">Statistics</h2>

          {/* Chart Wrapper */}
          <div className="flex-1 flex items-center justify-center">
            <AttendanceDoughnutChart
              cardData={data}
              employData={empData}
            />
          </div>
        </div>





      </div>

      {/* Exceptions + Bar Chart */}
      {
        role != "admin" &&
        <div className="mt-6 grid grid-cols-1 
      md:grid-cols-2 gap-6 max-h-[320px]">

          <div className="bg-white rounded-xl shadow-xl p-4 h-[320px] flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Exceptions</h2>

            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Late Coming</p>
                <h3 className="text-2xl font-bold text-red-500">250</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Early Leaving</p>
                <h3 className="text-2xl font-bold text-orange-500">250</h3>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Pending Requests</p>
              <div className="flex justify-between">
                <span>Leave Requests</span>
                <span className="font-bold text-blue-600">250</span>
              </div>
            </div>
          </div>

          {
            role !== "admin" &&
            <div className="bg-white rounded-xl shadow-xl p-4 h-[320px]">
              <AttendanceBarChart cardData={data} />
            </div>
          }

        </div>
      }

      {
        role == "admin" && <MonthlyHolidays holidays={holidayList} />
      }
    </div>
  );
};

export default Overview;
