import { Typography } from "@mui/material";
import AttendanceBarChart from "../charts/AttendanceBarChart";
import Leavecards from "../components/Leavecards";
import MonthlyHolidays from "../components/Monthlyholidays";
import Cards from "../components/Cards";
import profileImg from "../assets/avatar.webp";
import AttendanceDoughnutChart from "../charts/Doughnut";
import { IoPerson, IoExitOutline } from "react-icons/io5";
import { MdOutlineCoPresent } from "react-icons/md";
import { BsFillPersonXFill } from "react-icons/bs";
import { TbClockX } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

const Overview = () => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role?.toLowerCase()?.trim();
  const isAdmin = role === "admin";


  const adminData = [
    { id: 1, title: "Total Employees", total: 15, icon: <IoPerson />, bgColor: "#222f7d" },
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
      description: "Weekly Hours",
      icon: <IoExitOutline />,
      bgColor: "#e8970c"
    }
  ];

  const leaveData = [
    { id: 1, title: "Total Leaves Taken", value: 5, icon: <SlCalender />, bgColor: "#32a852" },
    { id: 2, title: "Leave Requests", value: 2, icon: <SlCalender />, bgColor: "#e8970c" },
    { id: 3, title: "Leaves Allowed", value: 15, icon: <SlCalender />, bgColor: "#e60707" }
  ];

  const holidayList = [
    { id: 1, name: "Christmas Day", date: "25 Dec 2025", month: "December" },
    { id: 2, name: "New Year’s Day", date: "01 Jan 2026", month: "January" },
    { id: 3, name: "Makar Sankranti / Pongal", date: "14 Jan 2026", month: "January" },
    { id: 4, name: "Republic Day", date: "26 Jan 2026", month: "January" }
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-[#222F7D] rounded-lg py-3 mb-6">
        <Typography className="text-white text-xl text-center font-semibold">
          Dashboard
        </Typography>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left Section */}
        <div className="lg:col-span-3 space-y-6">
          <Cards
            AdmincardData={adminData}
            EmploycardData={empData}
          />

          {/* Employee Leave Section */}
          {!isAdmin && (
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold mb-3">Leave Overview</h2>
              <Leavecards LeavecardData={leaveData} />
            </div>
          )}
        </div>

        {/* Right Profile (Employee Only) */}
        {!isAdmin && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="h-20 bg-gradient-to-r from-[#222F7D] to-[#4f63d2]" />

            <div className="-mt-12 flex justify-center">
              <img
                src={profileImg}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>

            <div className="px-6 pb-6 pt-3 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {user?.name}
              </h3>

              <span className="inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                {role}
              </span>

              <div className="border-t my-4" />

              <div className="text-sm text-gray-600 space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="font-medium">Employee ID</span>
                  <span className="text-gray-800">EMP-00{user?.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Email</span>
                  <span className="text-gray-800 truncate">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="bg-white rounded-xl shadow-xl p-4 h-auto flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>

            <div className="flex-1 flex items-center justify-center">
              <AttendanceDoughnutChart
                cardData={adminData}
              />
            </div>
          </div>
        )}

      </div>

      {/* Admin Section */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4">Exceptions</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-500">Late Coming</p>
                <h3 className="text-2xl font-bold text-red-500">250</h3>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-500">Early Leaving</p>
                <h3 className="text-2xl font-bold text-orange-500">250</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <AttendanceBarChart cardData={adminData} />
          </div>
        </div>
      )}

      {/* Employee Holidays */}
      {!isAdmin && (
        <div className="mt-6">
          <MonthlyHolidays holidays={holidayList} />
        </div>
      )}
    </div>
  );
};

export default Overview;
