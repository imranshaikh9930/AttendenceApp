import React from "react";
import { Doughnut } from "react-chartjs-2";
import { centerTextPlugin } from "../components/CenterTextPlugin";

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

  // Admin 
  const present =
  cardData.find(i => i.title === "Present Today")?.total || 0;

const total =
cardData.find(i => i.title === "Total Employee")?.total || 1;

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
