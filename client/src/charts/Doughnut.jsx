// import React, { useContext, useMemo } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { EmployContext } from "../context/EmployContextProvider";
// import { centerTextPlugin } from "../components/CenterTextPlugin";

// const AttendanceDoughnutChart = ({ cardData = [], employData = [] }) => {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const role = user?.role?.toLowerCase();

//   const { adminAttendance = [], loading } = useContext(EmployContext);

//   if (loading) return null;

//   /* ================= ADMIN ================= */
//   const adminStats = useMemo(() => {
//     const total = adminAttendance.length || 1;

//     const present = adminAttendance.filter(
//       (e) => e.status === "Present" || e.status === "Working"
//     ).length;

//     const absent = total - present;

//     return { total, present, absent };
//   }, [adminAttendance]);

//   /* 🔹 COLORS FROM CARD DATA */
//   const presentCard = cardData.find(c => c.title === "Present Today");
//   const absentCard = cardData.find(c => c.title === "Absent Today");

//   const adminChartData = {
//     labels: ["Present", "Absent"],
//     datasets: [
//       {
//         data: [adminStats.present, adminStats.absent],
//         backgroundColor: [
//           presentCard?.bgColor || "#16A34A",
//           absentCard?.bgColor || "#DC2626"
//         ],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const adminPercentage = Math.round(
//     (adminStats.present / adminStats.total) * 100
//   );

//   /* ================= EMPLOYEE ================= */
//   const worked = employData.find(i => i.title === "Total Hours")?.value || "00:00";
//   const [h, m] = worked.split(":").map(Number);
//   const workedHours = h + m / 60;

//   const expected = 9;
//   const remaining = Math.max(expected - workedHours, 0);
//   const empPercentage = Math.round((workedHours / expected) * 100);

//   const empChartData = {
//     labels: ["Worked", "Remaining"],
//     datasets: [
//       {
//         data: [workedHours, remaining],
//         backgroundColor: ["#4331cc", "#e0e0e0"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     cutout: "60%",
//     plugins: {
//       legend: { position: "bottom" },
//     },
//   };

//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       {/* ADMIN */}
//       {role === "admin" && (
//         <div className="w-[280px] h-[280px]">
//           <Doughnut
//             data={adminChartData}
//             options={options}
//             plugins={[
//               centerTextPlugin(
//                 `${adminPercentage}%`,
//                 "Present",
//                 presentCard?.bgColor || "#16A34A",
//                 "#555"
//               ),
//             ]}
//           />
//         </div>
//       )}

//       {/* EMPLOYEE */}
//       {role !== "admin" && (
//         <div className="w-[260px] h-[260px]">
//           <Doughnut
//             data={empChartData}
//             options={options}
//             plugins={[
//               centerTextPlugin(
//                 `${empPercentage}%`,
//                 "Worked",
//                 "#4331cc",
//                 "#555"
//               ),
//             ]}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AttendanceDoughnutChart;

import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { centerTextPlugin } from "../components/CenterTextPlugin";
import { EmployContext } from "../context/EmployContextProvider";

// Utility: convert "HH:MM AM/PM" to decimal hours
const timeToHours = (timeStr) => {
  if (!timeStr || timeStr === "--") return 0;

  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours + minutes / 60;
};

const AttendanceDoughnutChart = ({ cardData = [], employData = [] }) => {
  const role = localStorage.getItem("role");
   const { adminAttendance = [], loading } = useContext(EmployContext);

   console.log(adminAttendance);

  // Admin 
  const present =
  adminAttendance.find(i => i.title === "Present Today")?.total || 0;

const total =
adminAttendance.find(i => i.title === "Total Employee")?.total || 1;

const adminPercentage = Math.round((present / total) * 100);

  const adminChartData = {
    labels: cardData.map(item => item.title),
    datasets: [
      {
        data: cardData.map(item => item.total),
        backgroundColor: cardData.map(item => item.bgColor),
        borderWidth: 0,
      },
    ],
  };
  

  // Empolyee
  const punchIn = timeToHours(
    employData.find((i) => i.title === "Punch In")?.value
  );
  const punchOut = timeToHours(
    employData.find((i) => i.title === "Punch Out")?.value
  );

  const workedHours = Math.max(punchOut - punchIn, 0);
  const totalPossible = 9.5;
  const remaining = Math.max(totalPossible - workedHours, 0);
  const empPercentage = Math.round((workedHours / totalPossible) * 100);

  const empChartData = {
    labels: ["Worked Hours", "Remaining Hours"],
    datasets: [
      {
        data: [workedHours, remaining],
        backgroundColor: ["#4331cc", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "55%",
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      {/* Admin */}
      {role === "admin" && (
  <div className="w-[280px] h-[280px]">
    <Doughnut
      data={adminChartData}
      options={options}
      plugins={[
        centerTextPlugin(
          `${adminPercentage}%`,
          "Present",
          "#27F598",
          "#555"
        ),
      ]}
    />
  </div>
)}


      {/* Employee */}
      {role !== "admin" && (
        <div className="w-[260px] h-[260px]">
          <Doughnut
            data={empChartData}
            options={options}
            plugins={[
              centerTextPlugin(
                `${empPercentage}%`,
                "Worked",
                "#4331cc",
                "#555"
              ),
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default AttendanceDoughnutChart; 
