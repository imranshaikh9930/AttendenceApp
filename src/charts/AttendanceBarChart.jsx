import { Bar } from "react-chartjs-2";
import "../components/Charts";

const AttendanceBarChart = ({ cardData }) => {
  const chartData = {
    labels: cardData.map(item => item.title),
    datasets: [
      {
        label: "Employees",
        data: cardData.map(item => item.total),
        backgroundColor: cardData.map(item => item.bgColor),
        borderRadius: 8,
        categoryPercentage: 0.6,
        barPercentage: 0.5,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default AttendanceBarChart;
