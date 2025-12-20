import React from "react";
import { Doughnut } from "react-chartjs-2";
import { centerTextPlugin } from "../components/CenterTextPlugin";

// Utility: convert "HH:MM AM/PM" to decimal hours
const timeToHours = (timeStr) => {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours + minutes / 60;
};

const AttendanceDoughnutChart = ({ cardData = [], employData = [] }) => {
  const role = localStorage.getItem("role");

  //  Admin Doughnut
  const present = cardData.find(i => i.title === "Present Today")?.total || 0; 
  const total = cardData.find(i => i.title === "Total Employee")?.total || 1; 
  const Adminpercentage = Math.round((present / total) * 100);

  const adminChartData = {
    labels: ["Present", "Absent"],
    datasets: [
      { data: cardData.map(item => item.total), backgroundColor: cardData.map(item => item.bgColor), borderWidth: 0 }
    ]
  };

  //  Employee Doughnut 
  const punchIn = timeToHours(employData.find(i => i.title === "Punch In")?.value);
  const punchOut = timeToHours(employData.find(i => i.title === "Punch Out")?.value);
  const duration = punchOut - punchIn; // worked hours
  const totalPossible = 9.5; // total work hours
  const remaining = Math.max(totalPossible - duration, 0);
  const empPercentage = Math.round((duration / totalPossible) * 100);

  const empChartData = {
    labels: ["Worked Hours", "Remaining Hours"],
    datasets: [
      {
        data: [duration, remaining],
        backgroundColor: [
          employData.find(i => i.title === "Duration")?.bgColor || "#32a852",
          "#e0e0e0"
        ],
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "55%",
    plugins: {
      legend: { position: "bottom" },
      aspectRatio: 1.4 ,
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Admin Doughnut */}
    {/* Admin Doughnut */}
{role !== "admin" && (
  <div className="w-full md:w-1/2 h-[360px] flex flex-col">
    {/* <h3 className="text-center font-semibold mb-2">
      Admin Attendance
    </h3> */}

<div className="flex-1 flex items-center justify-center">
  <div className="w-[420px] h-[420px] md:w-[260px] md:h-[280px]">
    <Doughnut
      data={adminChartData}
      options={options}
      plugins={[
        centerTextPlugin(
          `${Adminpercentage}%`,
          "Present",
          "#27F598",
          "#555"
        )
      ]}
    />
  </div>
</div>

  </div>
)}

{/* Employee Doughnut */}
{role === "admin" && (
  <div className="w-full md:w-1/2 h-[360px] flex flex-col">
    {/* <h3 className="text-center font-semibold mb-2">
      Employee Worked Hours
    </h3> */}

    <div className="flex-1 flex items-center justify-center">
      <div className="w-[420px] h-[420px] md:w-[260px] md:h-[280px]">
        <Doughnut
          data={empChartData}
          options={options}
          plugins={[
            centerTextPlugin(
              `${empPercentage}%`,
              "Worked",
              "#4331cc",
              "#555"
            )
          ]}
        />
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AttendanceDoughnutChart;
