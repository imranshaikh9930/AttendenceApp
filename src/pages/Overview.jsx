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
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContextProvider";


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
      title: "Total Leave",
      value: "2 Days",
      description: "Monthly Leave",
      icon: <IoIosHome />,
      bgColor: "#e8970c"
    },
    {
      id: 4,
      title: "Duration",
      value: "8 hr",
      description: "Today's Working",
      icon: <FaRegClock />,
      bgColor: "#4331cc"
    }
  ];



  return (
    <div className="px-3 pb-6">

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#222F7D] rounded-lg">
        <Typography className="text-white py-2 text-2xl text-center">
          Dashboard
        </Typography>
      </div>

      {/* Cards + Doughnut */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Cards AdmincardData={data} EmploycardData={empData} />
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
    </div>
  );
};

export default Overview;
