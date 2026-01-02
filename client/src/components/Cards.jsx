import React, { useContext, useMemo } from "react";
import { EmployContext } from "../context/EmployContextProvider";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Cards = ({ EmploycardData = [] }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role?.toLowerCase()?.trim();

  const { adminAttendance = [], loading } = useContext(EmployContext);

  // Admin Data
  const adminCards = useMemo(() => {
    if (!adminAttendance.length) return [];

    const totalEmployees = adminAttendance.length;

    const presentToday = adminAttendance.filter(
      (emp) => emp.status === "Present" || emp.status === "Working"
    ).length;

    const absentToday = adminAttendance.filter(
      (emp) => emp.status === "Absent"
    ).length;

    return [
      {
        id: 1,
        title: "Total Employees",
        total: totalEmployees,
        icon: <PeopleIcon />,
        bgColor: "#4F46E5",
      },
      {
        id: 2,
        title: "Present Today",
        total: presentToday,
        icon: <CheckCircleIcon />,
        bgColor: "#16A34A",
      },
      {
        id: 3,
        title: "Absent Today",
        total: absentToday,
        icon: <CancelIcon />,
        bgColor: "#DC2626",
      },
    ];
  }, [adminAttendance]);

  if (loading) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Admin*/}
      {role === "admin" &&
        adminCards.map((data) => (
          <div
            key={data.id}
            className="w-full min-h-[120px] rounded-xl bg-white border border-gray-200
                       p-5 shadow-sm flex flex-col justify-between
                       transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg text-white text-2xl"
                style={{ backgroundColor: data.bgColor }}
              >
                {data.icon}
              </div>

              <div>
                <p className="text-sm text-gray-500">{data.title}</p>
                <p className="text-2xl font-semibold">{data.total}</p>
              </div>
            </div>
          </div>
        ))}

      {/* Employee */}
      {role !== "admin" &&
  Array.isArray(EmploycardData) &&
  EmploycardData.map((data) => (
    <div
      key={data.id}
      className="w-full min-h-[120px] rounded-xl bg-white border border-gray-200
                 p-5 shadow-sm flex flex-col justify-between
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-lg text-white text-2xl"
          style={{ backgroundColor: data.bgColor }}
        >
          {data.icon}
        </div>

        <div>
          <p className="text-sm text-gray-500">{data.title}</p>
          <p className="text-xl font-semibold">{data.value ?? "--"}</p>
        </div>
      </div>

      {data.description && (
        <p className="text-xs text-gray-400 mt-2">
          {data.description}
        </p>
      )}
    </div>
  ))}

    </div>
  );
};

export default Cards;
